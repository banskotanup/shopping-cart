import { Outlet } from "react-router-dom";
import Header from "./Header";
import CartTab from "./CartTab";
import { createContext, useState, useEffect } from "react";
import fetchProducts from "../data/products";

export const ShopContext = createContext({
  products: [],
  cartItems: [],
  addToCart: () => {},
});

const Layout = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function loadProduct() {
      const data = await fetchProducts();
      setProducts(data);
    }

    loadProduct();
  }, []);

  const addToCart = () => {};

  return (
    <ShopContext.Provider value={{ cartItems, products, addToCart }}>
      <div>
        <main>
          <Header />
          <hr />
          <Outlet />
        </main>
        <CartTab />
      </div>
    </ShopContext.Provider>
  );
};

export default Layout;
