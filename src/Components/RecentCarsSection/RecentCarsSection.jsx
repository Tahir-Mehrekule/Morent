import styles from "./RecentCarsSection.module.scss";
import { carsData } from "../../constants/index.js";
import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard.jsx";

function RecentCarsSection() {
  const [limit, setLimit] = useState(4);

  const toggleLimit = () => {
    setLimit((Limit) => (Limit > 4 ? 4 : carsData.length));
  };

  return (
    <div className={styles.RecentCarsSection}>
      <div className={styles.recentHeader}>
        <h2 className={styles.recentHeaderTitle}>Recent Car</h2>
        <button className={styles.recentHeaderButton} onClick={toggleLimit}>
          {limit > 4 ? "Show Less" : "View All"}
        </button>
      </div>
      <div className={styles.recentContent}>
        {carsData.slice(0, limit).map((car, index) => (
          <ProductCard
            key={index}
            name={car.name}
            category={car.category}
            fuelCapacity={car.fuelCapacity}
            transmission={car.transmission}
            peopleCap={car.people}
            productPrice={car.price}
            discount={car.discountRatio}
            carImg={car.imageUrl}
            likedState={car.liked}
          />
        ))}
      </div>
    </div>
  );
}

export default RecentCarsSection;
