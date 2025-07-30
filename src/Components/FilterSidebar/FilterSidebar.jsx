import { useState, useEffect } from "react";
import styles from "./FilterSidebar.module.scss";

function FilterSidebar({ carsData, onFilterChange }) {
  const [selectedType, setSelectedType] = useState([]);
  const [selectedCapacity, setSelectedCapacity] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);

  const handleTypeChange = (category) => {
    setSelectedType((prev) =>
      prev.includes(category)
        ? prev.filter((type) => type !== category)
        : [...prev, category]
    );
  };

  const handleCapacityChange = (capacity) => {
    setSelectedCapacity((prev) =>
      prev.includes(capacity)
        ? prev.filter((cap) => cap !== capacity)
        : [...prev, capacity]
    );
  };

  const handlePriceRangeChange = (e) => {
    const value = Number(e.target.value);
    setPriceRange([0, value]);
  };

  const applyFilters = () => {
    const filtered = carsData.filter((car) => {
      // İndirimli fiyatı hesapla
      const discountedPrice = car.discountRatio
        ? car.price - (car.price * car.discountRatio) / 100
        : car.price;

      const matchesType =
        selectedType.length === 0 || selectedType.includes(car.category);

      const matchesCapacity =
        selectedCapacity.length === 0 || selectedCapacity.includes(car.people);

      const matchesPrice =
        discountedPrice >= priceRange[0] && discountedPrice <= priceRange[1];

      return matchesType && matchesCapacity && matchesPrice;
    });

    onFilterChange(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedType, selectedCapacity, priceRange]);

  return (
    <div className={styles.FilterSidebarContainer}>
      {/* Kategori Filtreleme */}
      <div className={styles.FilterSidebarTypeFilter}>
        <h2 className={styles.FilterSidebarTypeFilterTitle}>TYPE</h2>
        {Array.from(new Set(carsData.map((car) => car.category))).map(
          (category) => {
            const categoryCount = carsData.filter(
              (car) => car.category === category
            ).length;

            return (
              <div
                className={styles.FilterSidebarTypeFilterInput}
                key={category}
              >
                <input
                  type="checkbox"
                  onChange={() => handleTypeChange(category)}
                  checked={selectedType.includes(category)}
                />
                <span>
                  {category}{" "}
                  <span className={styles.FilterSidebarTypeFilterSpan}>
                    ({categoryCount})
                  </span>
                </span>
              </div>
            );
          }
        )}
      </div>

      {/* Kapasite Filtreleme */}
      <div className={styles.FilterSidebarCapacityFilter}>
        <h2 className={styles.FilterSidebarCapacityFilterTitle}>CAPACITY</h2>
        {Array.from(new Set(carsData.map((car) => car.people))).map(
          (capacity) => {
            const carCount = carsData.filter(
              (car) => car.people === capacity
            ).length;

            return (
              <div
                className={styles.FilterSidebarCapacityFilterInput}
                key={capacity}
              >
                <input
                  type="checkbox"
                  onChange={() => handleCapacityChange(capacity)}
                  checked={selectedCapacity.includes(capacity)}
                />
                <span>
                  {capacity} Person{" "}
                  <span className={styles.FilterSidebarCapacityFilterSpan}>
                    ({carCount})
                  </span>
                </span>
              </div>
            );
          }
        )}
      </div>

      {/* Fiyat Filtreleme */}
      <div className={styles.FilterSidebarPriceFilter}>
        <h2 className={styles.FilterSidebarPriceFilterTitle}>PRICE</h2>
        <div className={styles.FilterSidebarPriceFilterInput}>
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={handlePriceRangeChange}
          />
          <span className={styles.FilterSidebarPriceFilter1}>
            {priceRange[1]}$
          </span>
        </div>
        <p>MAX.$100.00</p>
      </div>
    </div>
  );
}

export default FilterSidebar;
