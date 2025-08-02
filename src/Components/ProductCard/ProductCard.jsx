import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import gasStation from "../../assets/ProductCard/gas-station.svg";
import wheel from "../../assets/ProductCard/steeringWheel.svg";
import people from "../../assets/ProductCard/profile-2user.svg";
import styles from "./ProductCard.module.scss";

const ProductCard = ({
  id,
  name,
  category,
  fuelCapacity,
  transmission,
  peopleCap,
  productPrice,
  discount,
  carImg,
  likedState,
  onWishlistChange,
}) => {
  const [liked, setLiked] = useState(likedState);

  useEffect(() => {
    const storedCars = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isLiked = storedCars.some((car) => car.id === name);
    setLiked(isLiked);
  }, [name]);

  const toggleLike = () => {
    const storedCars = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!liked) {
      toast.success(`${name} modelini beğendin!`);
      
      // Wishlist bildirimi oluştur
      const wishlistNotification = {
        id: Date.now(),
        type: 'wishlist',
        title: 'Araç Wishlist\'e Eklendi',
        message: `${name} başarıyla wishlist'inize eklendi.`,
        carId: id,
        carName: name,
        timestamp: new Date(),
        isRead: false
      };
      
      // Bildirimleri localStorage'a kaydet
      const existingNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
      localStorage.setItem("notifications", JSON.stringify([wishlistNotification, ...existingNotifications]));
      
      // Header'daki bildirim sayacını güncellemek için custom event dispatch et
      window.dispatchEvent(new CustomEvent('notificationsUpdated'));
      
      localStorage.setItem(
        "wishlist",
        JSON.stringify([
          ...storedCars,
          {
            name,
            category,
            fuelCapacity,
            transmission,
            peopleCap,
            productPrice,
            discount,
            carImg,
            id: name,
          },
        ])
      );
    } else {
      // Beğeni kaldırıldığında bildirim göstermek için bu kısmı ekledik
      toast.error(`${name} beğenilerden kaldırıldı.`);
      const updatedCars = storedCars.filter((car) => car.id !== name);
      localStorage.setItem("wishlist", JSON.stringify(updatedCars));
    }
    
    // Header'daki wishlist sayacını güncellemek için custom event dispatch et
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
    
    setLiked(!liked);
    // onWishlistChange fonksiyonunu null check ile çağırıyoruz.
    if (onWishlistChange) {
      onWishlistChange();
    }
  };
  const navigate = useNavigate();
  return (
    <div className={styles.productContainer}>
      <div className={styles.productTitleTypeHearth}>
        <div className={styles.productTitleType}>
          <h5>{name}</h5>
          <p>{category}</p>
        </div>
        <div className={styles.likeHeart} onClick={toggleLike}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={liked ? "#FF0000" : "none"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69001C2 5.60001 4.49 3.10001 7.56 3.10001C9.38 3.10001 10.99 3.98001 12 5.34001C13.01 3.98001 14.63 3.10001 16.44 3.10001C19.51 3.10001 22 5.60001 22 8.69001C22 15.69 15.52 19.82 12.62 20.81Z"
              stroke={liked ? "none" : "#90A3BF"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className={styles.productImgContainer}>
        <img src={carImg} alt="car-img" />
        <div className={styles.imgBlur}></div>
      </div>
      <div className={styles.productInformationContainer}>
        <div className={styles.fuelTank}>
          <img src={gasStation} alt="" />
          <p>{fuelCapacity}</p>
        </div>
        <div className={styles.gearType}>
          <img src={wheel} alt="" />
          <p>{transmission}</p>
        </div>
        <div className={styles.capacity}>
          <img src={people} alt="" />
          <p>{peopleCap} People</p>
        </div>
      </div>
      <div className={styles.productPriceRent}>
        <div className={styles.price}>
          <div className={styles.currentPrice}>
            <p>
              $
              {discount
                ? (productPrice - (productPrice * discount) / 100).toFixed(2)
                : productPrice.toFixed(2)}
              /<span>&nbsp;day</span>
            </p>
          </div>
          {discount && (
            <div className={styles.priceBeforeDiscount}>
              <p>${productPrice.toFixed(2)}</p>
            </div>
          )}
        </div>
        <div className={styles.rentNowButton}>
          <button
            onClick={() => {
              // Seçilen araç bilgisini localStorage'a kaydet
              const selectedCar = {
                id,
                name,
                category,
                fuelCapacity,
                transmission,
                peopleCap,
                productPrice,
                discount,
                carImg,
                finalPrice: discount
                  ? (productPrice - (productPrice * discount) / 100)
                  : productPrice
              };
              localStorage.setItem("selectedCar", JSON.stringify(selectedCar));
              navigate(`/details/${id}`);
            }}
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;