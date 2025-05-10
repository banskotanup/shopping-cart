import { useContext, useState } from "react";
import styles from "./Home.module.css";
import { useEffect } from "react";
import { ShopContext } from "../components/layout";
import fetchProducts from "../data/products";

const Home = () => {
  const { products } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function loadHome() {
      const result = await fetchProducts();
      const category = ["All", ...new Set(result.map((item) => item.category))];
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

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

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
          <div>
            <div className={styles.cat}>
              {categories.map((category) => (
                <div
                  key={category}
                  className={`${styles.category} ${
                    selectedCategory === category ? styles.active : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
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
        </div>
      )}
    </div>
  );
};

export default Home;
