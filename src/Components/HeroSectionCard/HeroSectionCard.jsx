
import styles from "../HeroSection/HeroSection.module.scss";

const HeroSectionCard = ({
  title,
  subtitle,
  buttonText,
  imgSrc,
  altText,
  buttonColor,
}) => {
  return (
    <div className={`${styles.card} ${styles.secondCard}`}>
      <div className={styles.cardContent}>
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
        <button style={{ backgroundColor: buttonColor }}>{buttonText}</button>
        <div className={styles.imageContainer}>
          <img src={imgSrc} alt={altText} />
        </div>
      </div>
    </div>
  );
};

export default HeroSectionCard;
