import { Link, Outlet } from "react-router-dom";
import styles from "./Navbar.module.css";

export const Navbar = () => {
    return (
        <div className={styles.body}>
            <div className={styles.header}>
                <h1><Link to="/" className={styles.headLink}>Cartify</Link></h1>
                <div className={styles.nav}>
                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop</Link>
                    <Link to="/cart"><i className="fas fa-cart-plus fa-xs"></i></Link>
                </div>
            </div>
            <hr />
            <div className={styles.main}>
            <Outlet />
            </div>
            <footer className={styles.footer}>
                <p>Anup Banskota | { new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}