import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "./layout";

const Header = () => {
  const { cartItems, openCart } = useContext(ShopContext);
  const cartTotalLength = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className={styles.header}>
      <h1>
        <Link to="/" className={styles.headLink}>
          Cartify
        </Link>
      </h1>
      <div className={styles.nav}>
        <Link to="/" className={styles.active}>Home</Link>
        <div className={styles.cart} onClick={openCart}>
          <i className="fas fa-cart-plus fa-xs"></i>
          <sup>{cartTotalLength}</sup>
        </div>
      </div>
    </div>
  );
};

export default Header;
