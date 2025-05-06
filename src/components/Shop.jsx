import { useEffect, useState } from "react";
import products from "../data/products";

export default function Shop() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const result = await products();
      console.log(result);
    }
    fetchProduct();
  }, []);

  return (
    <div>
      <h1>Check console for product data</h1>
    </div>
  );
}