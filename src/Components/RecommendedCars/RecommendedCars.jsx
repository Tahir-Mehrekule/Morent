import { useState, useEffect } from "react";
import styles from "./RecommendedCars.module.scss";
import ProductCard from "../ProductCard/ProductCard";

const RecommendedCars = ({ carsData }) => {
  const [limit, setLimit] = useState(8);
  const [updatedCars, setUpdatedCars] = useState(carsData);

  useEffect(() => {
    // Wishlist değişikliklerini dinle
    const handleWishlistUpdate = () => {
      const storedCars = JSON.parse(localStorage.getItem("wishlist")) || [];
      
      // Araçları güncelle - wishlist durumlarını kontrol et
      const updatedCarsData = carsData.map(car => ({
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
  }, [carsData]);

  const toggleLimit = () => {
    setLimit((prevLimit) => (prevLimit > 8 ? 8 : carsData.length));
  };

  return (
    <div className={styles.recommendedCarsContainer}>
      <div className={styles.recommendedCarsHeader}>
        <div className={styles.innerContainer}>
          <h3 className={styles.recommendedCarsTitle}>Recommended Cars</h3>
        </div>
      </div>
      <div className={styles.recommendedCars}>
        {updatedCars.length > 0 ? (
          updatedCars
            .slice(0, limit)
            .map((car) => (
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
                onWishlistChange={() => {}}
              />
            ))
        ) : (
          <p className={styles.NoCarMatch}>No cars available.</p>
        )}
      </div>

      {updatedCars.length > 0 && (
        <div className={styles.recommendedCarsBottom}>
          <div className={styles.buttonContainer}>
            <button className={styles.recommendedCarsButton} onClick={toggleLimit}>
              {limit > 8 ? "Show Less" : "Show More Cars"}
            </button>
          </div>
          <div className={styles.textContainer}>
            <p>{updatedCars.length} Car{updatedCars.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendedCars;
