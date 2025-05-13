import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../components/layout";
import styles from "./Detail.module.css";

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const Detail = () => {
  const { slug } = useParams();
  const { products, addToCart } = useContext(ShopContext);

  const product = products.find((p) => generateSlug(p.title) === slug);

  if (!product) return <p>Product not found</p>;

  return (
    <div className={styles.prodDet}>
      <div className={styles.prodImg}>
        <img src={product.image} alt="product image" />
      </div>
      <div className={styles.prodDetails}>
              <h1>{product.title}</h1>
              <hr />
        <p className={styles.desc}>{product.description}</p>
        <hr />
              <p className={styles.category}>Category: <span>{ product.category}</span></p>
              <hr />
        <p className={styles.price}>NPR <span>{product.price}</span></p>
        <button onClick={()=>addToCart(product.id)}>Add to cart</button>
      </div>
    </div>
  );
};

export default Detail;
