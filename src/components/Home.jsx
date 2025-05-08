import { useState } from "react";
import styles from "./Home.module.css";
import { useEffect } from "react";
import products from "../data/products";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const categoryImages = {
    electronics: "/images/categories/ele.avif",
    jewelery : "/images/categories/jew.avif",
    "men's clothing" : "/images/categories/mans.jpg",
  };

  useEffect(() => {
    async function loadHome() {
      const result = await products();
      const category = [...new Set(result.map((item) => item.category))];
      setCategories(category);
      await sendMessage();
      setLoading(false);
    }
    loadHome();
  }, []);

  function sendMessage() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  function handleCardClick() {
    navigate("/shop");
  }

  return (
    <div>
      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <div>
          <div className={styles.welcomeText}>
            <div>
              <h1>Hello,</h1>
              <hr />
              <p>Welcome to Cratify!</p>
              <p>Where Smart Shopping Begins.</p>
              <p className={styles.p}>
                Cartify Shop is your one-stop destination for smart, seamless,
                and satisfying shopping. We offer a carefully curated selection
                of high-quality products designed to meet your everyday needs
                and elevate your lifestyle. With a focus on customer
                satisfaction, fast delivery, and unbeatable value, Cartify Shop
                combines convenience with reliability — making your shopping
                experience effortless and enjoyable.
              </p>
            </div>
            <img src="/images/shop.jpg" alt="shop image" />
          </div>
          <div className={styles.cat}>
            <h2>Shop by category</h2>
          </div>
          <div className={styles.cards}>
            {categories.map((category) => (
              <div key={category} className={styles.card} onClick={handleCardClick}>
                <img src={categoryImages[category]} alt="" />
                <p>{category}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
