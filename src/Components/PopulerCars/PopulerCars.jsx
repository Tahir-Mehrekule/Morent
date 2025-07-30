import ProductCard from "../ProductCard/ProductCard";
import styles from "./PopulerCars.module.scss";
import { useNavigate } from "react-router-dom";

const PopulerCars = ({ carsData }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.populerCarsContainer}>
      <div className={styles.populerCarsHeader}>
        <div className={styles.innerContainer}>
          <h3 className={styles.populerCarsTitle}>Populer Car</h3>
          <h3 
            className={styles.populerCarsSubtitle}
            onClick={() => navigate('/category')}
          >
            View All
          </h3>
        </div>
      </div>
      <div className={styles.populerCars}>
        {carsData.slice(0, 4).map((car) => (
          <ProductCard
            key={car.id}
            id={car.id}
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
};


export default PopulerCars;
