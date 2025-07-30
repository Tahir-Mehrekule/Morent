import styles from "./HeroSection.module.scss";
import heroSectionFirstCar from "./HeroSectionAssets/HeroSectionFirstCar.png";
import heroSectionSecondCar from "./HeroSectionAssets/HeroSectionSecondCar.png";
import HeroSectionCard from "../HeroSectionCard/HeroSectionCard";

function HeroSection() {
  return (
    <div className={styles.heroSection}>
      <HeroSectionCard
        title={"The Best Platform for Car Rental"}
        subtitle={
          "Ease of doing a car rental safely and reliably. Of course at a low price."
        }
        buttonText={"Rental Car"}
        imgSrc={heroSectionFirstCar}
        altText={"First Car"}
        buttonColor={"#74b6fc"}
      />

      <HeroSectionCard
        title={"Easy way to rent a car at a low price"}
        subtitle={
          "Providing cheap car rental services and safe and comfortable facilities."
        }
        buttonText={"Rental Car"}
        imgSrc={heroSectionSecondCar}
        altText={"Second Car"}
        buttonColor={"#54A6FF"}
      />
    </div>
  );
}

export default HeroSection;
