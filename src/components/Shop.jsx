import { useEffect, useState } from "react";
import products from "../data/products";
import styles from "./Shop.module.css";

export default function Shop() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function fetchProduct() {
      const result = await products();
      const category = ["All", ...new Set(result.map((item) => item.category))];
      setCategories(category);
      setProduct(result);
      setLoading(false);
    }
    fetchProduct();
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? product
      : product.filter((p) => (p.category === selectedCategory));

  return (
    <div>
      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <div>
          <div className={styles.cat}>
            {categories.map((category) => (
              <div key={category} className={`${styles.category} ${selectedCategory === category ? styles.active : ""}`} onClick={()=> setSelectedCategory(category)}>
                <p>{category}</p>
              </div>
            ))}
          </div>
          <div className={styles.cards}>
            {filteredProducts.map((prod) => {
              return (
                <div className={styles.card} key={prod.id}>
                  <div>
                    <img src={prod.image} alt="item image" />
                  </div>
                  <div className={styles.desc}>
                    <h3>{prod.title}</h3>
                    <hr />
                    <p>{prod.description}</p>
                    <p>{prod.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
