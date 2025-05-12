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
    const addToCartProduct = products.find((product) => p_id === product.id);
    setCartItems([...cartItems, addToCartProduct]);
  };

  const openCart = () => {
    if (cartDialogRef.current && !cartDialogRef.current.open) {
      cartDialogRef.current.showModal();
      document.querySelector(`.${styles.body}`).classList.add(styles.blur);

    }
  };

  return (
    <ShopContext.Provider value={{ cartItems, products, addToCart, openCart }}>
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
