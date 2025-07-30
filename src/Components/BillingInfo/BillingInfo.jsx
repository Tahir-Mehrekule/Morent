import styles from "./BillingInfo.module.scss";

const BillingInfo = () => {
  return (
    <div className={styles.billingInfo}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h2>Billing Info</h2>
          <p>Please enter your billing info</p>
        </div>
        <span className={styles.stepInfo}>Step 1 of 4</span>
      </div>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label>Name</label>
          <input type="text" placeholder="Your name" />
        </div>
        <div className={styles.formGroup}>
          <label>Phone Number</label>
          <input type="text" placeholder="Phone number" />
        </div>
        <div className={styles.formGroup}>
          <label>Address</label>
          <input type="text" placeholder="Address" />
        </div>
        <div className={styles.formGroup}>
          <label>Town / City</label>
          <input type="text" placeholder="Town or city" />
        </div>
      </form>
    </div>
  );
};

export default BillingInfo;
