import BillingInfo from "../../Components/BillingInfo/BillingInfo";
import RentalSummary from "../../Components/RentalSummary/RentalSummary";
import RentalInfo from "../../Components/RentalInfo/RentalInfo";
import styles from "./PaymentPage.module.scss";
import PaymentMethod from "../../Components/PaymentMethod/PaymentMethod";
import Confirmation from "../../Components/ConfirmationSection/confirmation";
export default function Payment() {
  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.mainContent}>
          <div className={styles.leftSection}>
            <BillingInfo />
            <RentalInfo />
            <PaymentMethod />
            <Confirmation />
          </div>

          <div className={styles.rightSection}>
            <RentalSummary />
          </div>
        </div>
      </div>
    </>
  );
}
