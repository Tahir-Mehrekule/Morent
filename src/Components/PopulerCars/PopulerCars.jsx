import { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./PopulerCars.module.scss";
import { useNavigate } from "react-router-dom";

const PopulerCars = ({ carsData }) => {
  const navigate = useNavigate();
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
        {updatedCars.slice(0, 4).map((car) => (
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
