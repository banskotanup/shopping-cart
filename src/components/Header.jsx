import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "./layout";

const Header = () => {
  const { cartItems } = useContext(ShopContext);

  return (
    <div className={styles.header}>
      <h1>
        <Link to="/" className={styles.headLink}>
          Cartify
        </Link>
      </h1>
      <div className={styles.nav}>
        <Link to="/" className={styles.active}>Home</Link>
        <div className={styles.cart}>
          <i className="fas fa-cart-plus fa-xs"></i>
          <sup>{cartItems.length}</sup>
        </div>
      </div>
    </div>
  );
};

export default Header;
