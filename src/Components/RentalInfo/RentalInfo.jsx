import { useState } from "react";
import styles from "./RentalInfo.module.scss";
import { FiChevronDown } from "react-icons/fi";

const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

const RentalInfo = () => {
  const [rentalData, setRentalData] = useState({
    isPickUp: true,
    pickUpLocation: "",
    dropOffLocation: "",
    pickUpDate: "",
    dropOffDate: "",
    pickUpTime: "",
    dropOffTime: "",
  });

  const handleRadioChange = () => {
    setRentalData((prevState) => ({
      ...prevState,
      isPickUp: !prevState.isPickUp,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRentalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={styles.rentalInfo}>
      <h2 className={styles.title}>Rental Info</h2>
      <p className={styles.subtitle}>Please select your rental date</p>
      <p className={styles.step}>Step 2 of 4</p>

      {/* Pick-up Section */}
      <div className={styles.section}>
        <label className={styles.radioContainer}>
          <input
            type="radio"
            name="rental-type"
            checked={rentalData.isPickUp}
            onChange={handleRadioChange}
          />
          <span className={styles.radioLabel}>Pick - Up</span>
        </label>
        <div className={styles.formGroup}>
          {/* Pick-up Location */}
          <div className={styles.formField}>
            <label>Locations</label>
            <div className={styles.selectWrapper}>
              <select
                name="pickUpLocation"
                value={rentalData.pickUpLocation}
                onChange={handleInputChange}
              >
                <option value="">Select your city</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <FiChevronDown className={styles.icon} />
            </div>
          </div>

          {/* Pick-up Date */}
          <div className={styles.formField}>
            <label>Date</label>
            <input
              type="date"
              name="pickUpDate"
              value={rentalData.pickUpDate}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>

          {/* Pick-up Time */}
          <div className={styles.formField}>
            <label>Time</label>
            <input
              type="time"
              name="pickUpTime"
              value={rentalData.pickUpTime}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>
        </div>
      </div>

      {/* Drop-off Section */}
      <div className={styles.section}>
        <label className={styles.radioContainer}>
          <input
            type="radio"
            name="rental-type"
            checked={!rentalData.isPickUp}
            onChange={handleRadioChange}
          />
          <span className={styles.radioLabel}>Drop - Off</span>
        </label>
        <div className={styles.formGroup}>
          {/* Drop-off Location */}
          <div className={styles.formField}>
            <label>Locations</label>
            <div className={styles.selectWrapper}>
              <select
                name="dropOffLocation"
                value={rentalData.dropOffLocation}
                onChange={handleInputChange}
              >
                <option value="">Select your city</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <FiChevronDown className={styles.icon} />
            </div>
          </div>

          {/* Drop-off Date */}
          <div className={styles.formField}>
            <label>Date</label>
            <input
              type="date"
              name="dropOffDate"
              value={rentalData.dropOffDate}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>

          {/* Drop-off Time */}
          <div className={styles.formField}>
            <label>Time</label>
            <input
              type="time"
              name="dropOffTime"
              value={rentalData.dropOffTime}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalInfo;
