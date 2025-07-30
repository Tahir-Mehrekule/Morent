import { FaSearch } from "react-icons/fa";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { carsData } from "../constants/index";
import styles from "./SearchBar.module.scss";

// Debounce fonksiyonu
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Dışarı tıklama algılama
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Basit arama fonksiyonu  
  const performSearch = useCallback((term) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    const filtered = carsData.filter((car) =>
      car.name.toLowerCase().includes(term.toLowerCase()) ||
      car.category.toLowerCase().includes(term.toLowerCase()) ||
      car.transmission.toLowerCase().includes(term.toLowerCase()) ||
      car.fuelCapacity.toString().includes(term)
    );

    setSearchResults(filtered.slice(0, 6));
  }, []);

  // Debounced arama
  const debouncedSearch = useCallback(
    debounce((term) => performSearch(term), 300),
    [performSearch]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
    setActiveIndex(-1);
    setIsDropdownOpen(value.trim().length > 0);
  };

  const handleInputFocus = () => {
    if (searchTerm.trim()) {
      setIsDropdownOpen(true);
    }
  };

  const handleCarSelect = (car) => {
    navigate(`/details/${car.id}`);
    setIsDropdownOpen(false);
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleKeyDown = (e) => {
    if (!isDropdownOpen || searchResults.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":  
        e.preventDefault();
        setActiveIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < searchResults.length) {
          handleCarSelect(searchResults[activeIndex]);
        }
        break;
      case "Escape":
        setIsDropdownOpen(false);
        setActiveIndex(-1);
        break;
    }
  };

  const handleViewAllResults = () => {
    navigate("/category");
    setIsDropdownOpen(false);
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <div className={styles.searchBarContainer} ref={searchRef}>
      <div className={styles.searchBar}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search something here"
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Search Results Dropdown */}
      {isDropdownOpen && searchResults.length > 0 && (
        <div className={styles.searchDropdown}>
          <div className={styles.dropdownHeader}>
            <span className={styles.resultsCount}>
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
            </span>
          </div>
          <ul className={styles.searchResultsList}>
            {searchResults.map((car, index) => (
              <li
                key={car.id}
                className={`${styles.searchResultItem} ${
                  index === activeIndex ? styles.active : ""
                }`}
                onClick={() => handleCarSelect(car)}
              >
                <div className={styles.carImageContainer}>
                  <img
                    src={car.imageUrl}
                    alt={car.name}
                    className={styles.carImage}
                  />
                </div>
                <div className={styles.carInfo}>
                  <div className={styles.carName}>{car.name}</div>
                  <div className={styles.carDetails}>
                    <span className={styles.carCategory}>{car.category}</span>
                    <span className={styles.carSpecs}>
                      {car.transmission} • {car.fuelCapacity}L
                    </span>
                  </div>
                </div>
                <div className={styles.carPrice}>
                  <span className={styles.price}>
                    ${car.price}/day
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <button className={styles.viewAllButton} onClick={handleViewAllResults}>
            View all results →
          </button>
        </div>
      )}

      {isDropdownOpen && searchTerm && searchResults.length === 0 && (
        <div className={styles.searchDropdown}>
          <div className={styles.noResults}>
            <FaSearch className={styles.noResultsIcon} />
            <span className={styles.noResultsText}>No cars found</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
