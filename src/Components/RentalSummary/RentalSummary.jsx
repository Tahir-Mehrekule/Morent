import { useState } from "react";
import styles from "./RentalSummary.module.scss";

const RentalSummary = () => {
  const [subtotal, setSubtotal] = useState(80.0);
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const promoCodes = [
    { code: "DISCOUNT10", discount: 10 },
    { code: "DISCOUNT20", discount: 20 },
    { code: "SUPERDISCOUNT30", discount: 30 },
    { code: "SUPERDISCOUNT40", discount: 40 },
  ];

  const handleApplyPromo = () => {
    if (!discountApplied) {
      const validPromo = promoCodes.find((code) => code.code === promoCode);
      if (validPromo) {
        const discountedPrice = subtotal * (1 - validPromo.discount / 100);
        setSubtotal(discountedPrice);
        setDiscountApplied(true);
      } else {
        alert("Invalid promo code!");
      }
    } else {
      alert("Discount already applied!");
    }
  };

  return (
    <div className={styles.rentalSummary}>
      <h2 className={styles.rentalTitle}>Rental Summary</h2>
      <p className={styles.rentalDescription}>
        Prices may change depending on the length of the rental and the price of
        your rental car.
      </p>
      <div className={styles.rentalCard}>
        <img
          src="/NissanGT-R.svg"
          alt="Nissan GT-R"
          className={styles.nissanImage}
        />
        <div className={styles.carDetails}>
          <h3 className={styles.detailsTitle}>Nissan GT - R</h3>
          <div className={styles.rating}>
            <img
              src="../../public/ReviewStar.svg"
              alt="Star Rating"
              className={styles.stars}
            />
            <span className={styles.reviewer}>440+ Reviewer</span>
          </div>
        </div>
      </div>
      <div className={styles.priceDetails}>
        <div className={styles.priceRow}>
          <span className={styles.subTitle}>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.subTitle}>Tax</span>
          <span>$0</span>
        </div>
        <div className={styles.promoCode}>
          <input
            type="text"
            placeholder="Apply promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button onClick={handleApplyPromo}>Apply now</button>
        </div>
        <div className={styles.totalPrice}>
          <span>Total Rental Price</span>
          <span className={styles.totalAmount}>${subtotal.toFixed(2)}</span>
        </div>
        <p className={styles.priceNote}>
          Overall price and includes rental discount
        </p>
      </div>
    </div>
  );
};

export default RentalSummary;
