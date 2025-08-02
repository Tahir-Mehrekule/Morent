import { useState } from "react";
import styles from "./RentalSummary.module.scss";

const RentalSummary = () => {
  const [subtotal, setSubtotal] = useState(80.0);
  const [originalPrice, setOriginalPrice] = useState(80.0);
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountMessage, setDiscountMessage] = useState("");

  const promoCodes = [
    { code: "MORENT10", discount: 10, description: "%10 İndirim" },
    { code: "DISCOUNT20", discount: 20, description: "%20 İndirim" },
    { code: "SUPERDISCOUNT30", discount: 30, description: "%30 İndirim" },
    { code: "SUPERDISCOUNT40", discount: 40, description: "%40 İndirim" },
  ];

  const handleApplyPromo = () => {
    if (!discountApplied) {
      const validPromo = promoCodes.find((code) => code.code === promoCode.toUpperCase());
      if (validPromo) {
        const discountAmount = originalPrice * (validPromo.discount / 100);
        const discountedPrice = originalPrice - discountAmount;
        setSubtotal(discountedPrice);
        setDiscountApplied(true);
        setAppliedDiscount(discountAmount);
        setDiscountMessage(`${validPromo.description} uygulandı!`);
      } else {
        alert("Geçersiz promo kod!");
      }
    } else {
      alert("İndirim zaten uygulandı!");
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
          <span>${originalPrice.toFixed(2)}</span>
        </div>
        {discountApplied && (
          <div className={styles.priceRow}>
            <span className={styles.subTitle}>İndirim</span>
            <span style={{ color: '#e74c3c' }}>-${appliedDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className={styles.priceRow}>
          <span className={styles.subTitle}>Tax</span>
          <span>$0</span>
        </div>
        <div className={styles.promoCode}>
          <input
            type="text"
            placeholder="Promo kod girin (örn: MORENT10)"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button onClick={handleApplyPromo}>Uygula</button>
        </div>
        {discountMessage && (
          <div style={{ 
            color: '#27ae60', 
            fontSize: '14px', 
            marginTop: '8px',
            fontWeight: '500'
          }}>
            {discountMessage}
          </div>
        )}
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
