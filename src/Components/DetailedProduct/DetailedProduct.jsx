import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DetailedProduct.module.scss";
import { carsData } from "./DetailedProductData";
import heartFill from "/heart-fill.png";
import heartEmpty from "/heart-empty.png";
import starFill from "/star-fill.svg";
import starEmpty from "/star-empty.svg";

const DetailedProduct = ({ id }) => {
  const navigate = useNavigate();

  const [imgSrc, setImgSrc] = useState(null);
  const [mainPhotoStyle, setMainPhotoStyle] = useState("");
  const [heartIcon, setHeartIcon] = useState(null);



  const foundCar = carsData.find((car) => {
    return car.id == id;
  });

  if (!foundCar) {
    return (
      <h1 className={styles.warning}>
        Car not found, go to{" "}
        <a href="/" className={styles.linkToHomePage}>
          home page{" "}
        </a>
      </h1>
    );
  }

  useEffect(() => {
    setImgSrc(foundCar.mainImg);
    setMainPhotoStyle(styles.mainPhoto);
    setHeartIcon(foundCar.isFavorite ? heartFill : heartEmpty);
  }, []);

  const handleHeartIcon = () => {
    setHeartIcon((prevIcon) =>
      prevIcon == heartEmpty ? (prevIcon = heartFill) : (prevIcon = heartEmpty)
    );
  };

  let ratingArray = [];

  for (let i = 1; i <= foundCar.rating; i++) {
    ratingArray.push(1);
  }

  while (ratingArray.length < 5) {
    ratingArray.push(0);
  }

  const newPrice =
    foundCar.discountRate != 0
      ? foundCar.price - (foundCar.price * foundCar.discountRate) / 100
      : foundCar.price;

  return (
    <div className={styles.detailedProduct}>
      <div className={styles.imgColumn}>
        <div className={styles.mainImgWrapper}>
          <img src={imgSrc} className={mainPhotoStyle} alt="Nissan" />
          <span className={styles.imgText}>
            <h2>
              Sports car with the best
              <br /> design and acceleration
            </h2>
            <p>
              Safety and comfort while driving a<br /> futuristic and elegant
              sports car
            </p>
          </span>
        </div>
        <div className={styles.thumbnailsContainer}>
          <img
            src={foundCar.mainImg}
            onClick={() => {
              setImgSrc(foundCar.mainImg);
              setMainPhotoStyle(styles.mainPhoto);
            }}
            alt="Nissan"
          />
          <img
            src={foundCar.interior1}
            onClick={() => {
              setImgSrc(foundCar.interior1);
              setMainPhotoStyle(styles.otherPhoto);
            }}
            alt="Nissan"
          />
          <img
            src={foundCar.interior2}
            onClick={() => {
              setImgSrc(foundCar.interior2);
              setMainPhotoStyle(styles.otherPhoto);
            }}
            alt="Nissan"
          />
        </div>
      </div>

      <div className={styles.carDetailColumn}>
        <div className={styles.titleRow}>
          <h1>{foundCar.title}</h1>
          <img src={heartIcon} onClick={handleHeartIcon} alt="heartIcon" />
        </div>
        <div className={styles.ratingRow}>
          {ratingArray.map((star, index) => {
            if (star == 1) {
              return <img key={index} src={starFill} alt="starIcon" />;
            } else {
              return <img key={index} src={starEmpty} alt="starIconEmpty" />;
            }
          })}
          <p>{foundCar.reviewer}+ Reviewers</p>
        </div>
        <p className={styles.description}>{foundCar.description}</p>
        <div className={styles.statSection}>
          <div className={styles.statRow}>
            <div className={styles.statInfo}>
              <p>Type Car</p>
              <span>{foundCar.type}</span>
            </div>
            <div className={styles.statInfo}>
              <p>Capacity</p>
              <span>{foundCar.capacity}</span>
            </div>
          </div>
          <div className={styles.statRow}>
            <div className={styles.statInfo}>
              <p>Steering</p>
              <span>{foundCar.steering}</span>
            </div>
            <div className={styles.statInfo}>
              <p>Gasoline</p>
              <span>{foundCar.fuelCapacity}</span>
            </div>
          </div>
        </div>
        <div className={styles.rentSection}>
          <div className={styles.priceContainer}>
            <p className={styles.newPrice}>
              ${newPrice}.00 /<span>days</span>
            </p>
            <p className={styles.oldPrice}>
              {foundCar.discountRate != 0 ? "$" + foundCar.price + ".00" : null}{" "}
            </p>
          </div>
            <button onClick={() =>{navigate("/payment")}} className={styles.rentNowBtn}>Rent Now</button>
        </div>
      </div>
    </div>
  );
};

export default DetailedProduct;
