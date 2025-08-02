import { useState, useEffect } from "react";
import styles from "./CategoryCar.module.scss";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { carsData } from "../../constants/index";

const CategoryCar = ({ cars }) => {
  const [limit, setLimit] = useState(8);
  const [updatedCars, setUpdatedCars] = useState(cars);

  useEffect(() => {
    // Wishlist değişikliklerini dinle
    const handleWishlistUpdate = () => {
      const storedCars = JSON.parse(localStorage.getItem("wishlist")) || [];
      
      // Araçları güncelle - wishlist durumlarını kontrol et
      const updatedCarsData = cars.map(car => ({
        ...car,
        liked: storedCars.some(wishlistCar => wishlistCar.id === car.name)
      }));
      
      setUpdatedCars(updatedCarsData);
    };

    // Event listener ekle
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    
    // İlk yükleme
    handleWishlistUpdate();

    // Cleanup
    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, [cars]);

  const toggleLimit = () => {
    setLimit((prevLimit) => (prevLimit > 8 ? 8 : carsData.length));
  };

  return (
    <div className={styles.CategoryCarContainer}>
      <div className={styles.CategoryCarContentCard}>
        {updatedCars.length > 0 ? (
          updatedCars
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

      {updatedCars.length > 0 && (
        <div className={styles.CategoryCarBtnContainer}>
          <div className={styles.CategoryCarBtn}>
            <button onClick={toggleLimit}>
              {limit > 8 ? "Show Less" : "Show More Cars"}
            </button>
            <p>{updatedCars.length} Car{updatedCars.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCar;
