import styles from "./PaymentMethod.module.scss";
import PaymentStyle from "./PaymentStyle/PaymentStyle";

const PaymentMethod = () => {
  return (
    <div className={styles.paymentMethod}>
      <div className={styles.paymentMethodContainer}>
        <div className={styles.paymentMethodHeader}>
          <div className={styles.paymentMethodHeaderTitle}>
            <h1>Payment Method</h1>
            <p>Please enter your payment method</p> 
          </div>
          <div className={styles.paymentMethodHeaderStep}>
            <p>Step 3 of 4</p>
          </div>
        </div>
        <PaymentStyle />
      </div>
    </div>
  );
};

export default PaymentMethod;