import { Outlet } from "react-router-dom";
import Header from "./Header";
import CartTab from "./CartTab";
import { createContext, useState, useEffect, useRef } from "react";
import fetchProducts from "../data/products";
import Footer from "./Footer";
import styles from "./Layout.module.css";

export const ShopContext = createContext({
  products: [],
  cartItems: [],
  addToCart: () => {},
  openCart: () => {}, // provide this to the context
});

const Layout = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const cartDialogRef = useRef(null);

  useEffect(() => {
    async function loadProduct() {
      const data = await fetchProducts();
      setProducts(data);
    }

    loadProduct();
  }, []);

  const addToCart = (p_id) => {
    const productToAdd = products.find((product) => p_id === product.id);
    const existingCartItem = cartItems.find((item) => item.id === p_id);

    if (existingCartItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === p_id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
    }
  };

  const openCart = () => {
    if (cartDialogRef.current && !cartDialogRef.current.open) {
      cartDialogRef.current.showModal();
      document.body.classList.add("blur");
    }
  };

  const incrementQuantity = (p_id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === p_id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (p_id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === p_id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    ); // Remove if quantity is 0
  };

  const handleCheckout = () => {
    alert("You successfully checkout!");
    setCartItems([]);
    cartDialogRef.current.close();
    document.body.classList.remove("blur");
  }

  const removeFromCart = (p_id) => {
    setCartItems(cartItems.filter((item) => item.id !== p_id));
  };

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        products,
        addToCart,
        openCart,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        handleCheckout,
      }}
    >
      <div className={styles.body}>
        <Header />
        <main>
          <hr />
          <Outlet />
        </main>
        <CartTab dialogRef={cartDialogRef} />
        <Footer />
      </div>
    </ShopContext.Provider>
  );
};

export default Layout;
