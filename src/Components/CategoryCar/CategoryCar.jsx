import { useState } from "react";
import styles from "./CategoryCar.module.scss";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { carsData } from "../../constants/index";

const CategoryCar = ({ cars }) => {
  const [limit, setLimit] = useState(8);

  const toggleLimit = () => {
    setLimit((prevLimit) => (prevLimit > 8 ? 8 : carsData.length));
  };

  return (
    <div className={styles.CategoryCarContainer}>
      <div className={styles.CategoryCarContentCard}>
        {cars.length > 0 ? (
          cars
            .slice(0, limit)
            .map((car) => (
              <ProductCard
                key={car.id}
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
            ))
        ) : (
          <p className={styles.NoCarMatch}>No cars match your filters.</p>
        )}
      </div>

      {cars.length > 0 && (
        <div className={styles.CategoryCarBtnContainer}>
          <div className={styles.CategoryCarBtn}>
            <button onClick={toggleLimit}>
              {limit > 8 ? "Show Less" : "Show More Cars"}
            </button>
            <p>{cars.length} Car{cars.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCar;
