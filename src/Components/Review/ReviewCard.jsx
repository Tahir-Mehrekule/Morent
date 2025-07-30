import styles from "./Review.module.scss";

const ReviewCard = ({ name, title, date, rating, comment, profileImage }) => {
  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.reviewContent}>
        <div className={styles.reviewContentTop}>
          <div className={styles.leftSection}>
            <img
              src={profileImage}
              alt={`${name}'s profile`}
              className={styles.profileImage}
            />
            <div className={styles.authorInfo}>
              <h4>{name}</h4>
              <p>{title}</p>
            </div>
          </div>

          <div className={styles.rightSection}>
            <span className={styles.date}>{date}</span>
            <div className={styles.reviewRating}>
              {"★".repeat(rating)}
              {"☆".repeat(5 - rating)}
            </div>
          </div>
        </div>

        <p className={styles.reviewComment}>{comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
