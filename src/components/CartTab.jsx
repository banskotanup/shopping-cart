import styles from "./CartTab.module.css";

const CartTab = ({ dialogRef }) => {
    return (
      <dialog ref={dialogRef} className={styles.dialog}>
            <h1>Cart</h1>
            <hr />
        <p>This is your cart content.</p>
        <button onClick={() => dialogRef.current.close()}>Close</button>
      </dialog>
    );
  };
  
  export default CartTab;
  