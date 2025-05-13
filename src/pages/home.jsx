import { useContext, useState } from "react";
import styles from "./Home.module.css";
import { useEffect } from "react";
import { ShopContext } from "../components/layout";
import fetchProducts from "../data/products";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { products, addToCart } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

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

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const handleCardClick = (prod) => {
    const slug = generateSlug(prod.title);
    navigate(`/${slug}`);
  }

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {loading ? (
        <div className={styles.loading}>
          <p>Loading...</p>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <div>
          <div className={styles.welcomeText}>
            <div>
              <h1>Hello,</h1>
              <hr />
              <p className={styles.wel}>Welcome to Cratify!</p>
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
                    <div className={styles.img}>
                      <img src={prod.image} alt="item image" onClick={()=>handleCardClick(prod)}/>
                    </div>
                    <div className={styles.desc}>
                      <h3 onClick={()=>handleCardClick(prod)}>{prod.title}</h3>
                      <hr />
                      <p className={styles.price}>NPR <span className={styles.sPrc}>{prod.price}</span></p>
                      <p className={styles.pDesc}>{prod.description}</p>
                    </div>
                    <button className={styles.addToCartBtn} onClick={()=> addToCart(prod.id)}>Add to cart</button>
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
