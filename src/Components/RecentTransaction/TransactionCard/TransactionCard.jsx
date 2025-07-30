import styles from "./TransactionCard.module.scss";

const TransactionCard = ({ image, name, category, price, date }) => {
  return (
    <div className={styles.transactionItem}>
      <div className={styles.transactionInfo}>
        <div className={styles.carImage}>
          <img src={image} alt={name} />
        </div>
        <div className={styles.carDetails}>
          <h3>{name}</h3>
          <p>{category}</p>
        </div>
      </div>
      <div className={styles.transactionMeta}>
        <p className={styles.date}>{date}</p>
        <p className={styles.price}>${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default TransactionCard;