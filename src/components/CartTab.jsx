import { useContext } from "react";
import styles from "./CartTab.module.css";
import { ShopContext } from "./layout";

const CartTab = ({ dialogRef }) => {
  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart, handleCheckout } = useContext(ShopContext);

  function handleCartClose() {
    dialogRef.current.close();
    document.body.classList.remove("blur");
  }

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.cartHeader}>
        <h1>Cart</h1>
        <button onClick={handleCartClose}>X</button>
      </div>
      <hr />
      {cartItems.length < 1 ? (
        <div className={styles.emtCart}>
          <h3>You haven't added anything to cart yet...</h3>
        </div>
      ) : (
          <div className={styles.cartItems}>
            <div>
        <div className={styles.cartContHeader}>
          <h3 className={styles.h3Img}>Image</h3>
          <h3 className={styles.h3Tit}>Title</h3>
          <h3 className={styles.h3Qty}>Quantity</h3>
          <h3 className={styles.h3Tot}>Total</h3>
          <h3 className={styles.h3Act}>Action</h3>
        </div>
        <hr className={styles.hr} />
        </div>
        {cartItems.map((cartItem) => (
          <div key={cartItem.id}>
            <div className={styles.cartContent}>
          <img src={cartItem.image} alt="cart image" />
              <h3 className={styles.h3ContTit}>{ cartItem.title}</h3>
          <div className={styles.cartBtns}>
            <button onClick={() => decrementQuantity(cartItem.id)}>-</button>
            <p>{cartItem.quantity}</p>
            <button onClick={() => incrementQuantity(cartItem.id)}>+</button>
          </div>
          <h3 className={styles.tot}>{cartItem.price * cartItem.quantity}</h3>
          <button className={styles.delete} onClick={() => removeFromCart(cartItem.id)}>Delete</button>
        </div>
        <hr className={styles.hr} />
          </div>
        ))}
        </div>
      )}
      {cartItems.length > 0 && (
  <div className={styles.cartFooter}>
    <h2>Total: NPR {cartTotal.toFixed(2)}</h2>
    <button className={styles.checkoutButton} onClick={handleCheckout}>Checkout</button>
  </div>
)}
      
      
    </dialog>
  );
};

export default CartTab;
