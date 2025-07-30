import { useState } from "react";
import styles from "./RangePicker.module.scss";

const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

const RangePicker = () => {
  const [isPickupFirst, setIsPickupFirst] = useState(true);

  const swapSections = () => {
    setIsPickupFirst(!isPickupFirst);
  };

  const RangeSection = ({ type }) => {
    const [rentalData, setRentalData] = useState({
      location: "",
      date: "",
      time: "",
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setRentalData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    return (
      <div className={styles.RangePicker}>
        <div className={styles.radioGroup}>
          <div className={`${styles.radioContainer} ${styles[type]}`}>
            <input type="radio" checked readOnly />
            <span className={styles.radioLabel}>
              {type === "pick-up" ? "Pick-Up" : "Drop-Off"}
            </span>
          </div>
        </div>
        <div className={styles.formGroup}>
          {/* Location */}
          <div className={styles.formField}>
            <label>Location</label>
            <div className={styles.selectWrapper}>
              <select
                name="location"
                value={rentalData.location}
                onChange={handleInputChange}
              >
                <option value="">Select your city</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div className={styles.formField}>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={rentalData.date}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>

          {/* Time */}
          <div className={styles.formField}>
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={rentalData.time}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.rangeContainer}>
      {isPickupFirst ? (
        <>
          <RangeSection type="pick-up" />
          <button className={styles.swapButton} onClick={swapSections}>
            ↓↑
          </button>
          <RangeSection type="drop-off" />
        </>
      ) : (
        <>
          <RangeSection type="drop-off" />
          <button className={styles.swapButton} onClick={swapSections}>
            ↓<br />↑
          </button>
          <RangeSection type="pick-up" />
        </>
      )}
    </div>
  );
};

export default RangePicker;
