import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar.jsx";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.jsx";
import styles from "./Header.module.scss";


const Header = () => {
  const navigate = useNavigate();
  const handleHeartClick = () => {
    navigate("/wishlist");
  };
  const handleAdminClick = () => {
    navigate("/admin");
  };
  const handleHomeClick = () => {
    navigate("/");
  };
  return (
    <div className={styles.headerContainer}>
      <h2 className={styles.headerTitle} onClick={handleHomeClick} style={{ cursor: 'pointer' }}>MORENT</h2>
      <SearchBar />

      <div className={styles.headerOptions}>
        {/* Desktop Icons - 768px üstünde görünür */}
        <button className={styles.headerLike} onClick={handleHeartClick}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69001C2 5.60001 4.49 3.10001 7.56 3.10001C9.38 3.10001 10.99 3.98001 12 5.34001C13.01 3.98001 14.63 3.10001 16.44 3.10001C19.51 3.10001 22 5.60001 22 8.69001C22 15.69 15.52 19.82 12.62 20.81Z"
              stroke="#596780"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="#596780"
            />
          </svg>
        </button>
        <button className={styles.headerNotification}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.3399 14.49L18.3399 12.83C18.1299 12.46 17.9399 11.76 17.9399 11.35V8.82C17.9399 6.47 16.5599 4.44 14.5699 3.49C14.0499 2.57 13.0899 2 11.9899 2C10.8999 2 9.91994 2.59 9.39994 3.52C7.44994 4.49 6.09994 6.5 6.09994 8.82V11.35C6.09994 11.76 5.90994 12.46 5.69994 12.82L4.68994 14.49C4.28994 15.16 4.19994 15.9 4.44994 16.58C4.68994 17.25 5.25994 17.77 5.99994 18.02C7.93994 18.68 9.97994 19 12.0199 19C14.0599 19 16.0999 18.68 18.0399 18.03C18.7399 17.8 19.2799 17.27 19.5399 16.58C19.7999 15.89 19.7299 15.13 19.3399 14.49Z"
              fill="#596780"
            />
            <path
              d="M14.8302 20.01C14.4102 21.17 13.3002 22 12.0002 22C11.2102 22 10.4302 21.68 9.88018 21.11C9.56018 20.81 9.32018 20.41 9.18018 20C9.31018 20.02 9.44018 20.03 9.58018 20.05C9.81018 20.08 10.0502 20.11 10.2902 20.13C10.8602 20.18 11.4402 20.21 12.0202 20.21C12.5902 20.21 13.1602 20.18 13.7202 20.13C13.9302 20.11 14.1402 20.1 14.3402 20.07C14.5002 20.05 14.6602 20.03 14.8302 20.01Z"
              fill="#596780"
            />
          </svg>
        </button>
        <button className={styles.headerSettings}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.1 9.22C18.29 9.22 17.55 7.94 18.45 6.37C18.97 5.46 18.66 4.3 17.75 3.78L16.02 2.79C15.23 2.32 14.21 2.6 13.74 3.39L13.63 3.58C12.73 5.15 11.25 5.15 10.34 3.58L10.23 3.39C9.78 2.6 8.76 2.32 7.97 2.79L6.24 3.78C5.33 4.3 5.02 5.47 5.54 6.38C6.45 7.94 5.71 9.22 3.9 9.22C2.86 9.22 2 10.07 2 11.12V12.88C2 13.92 2.85 14.78 3.9 14.78C5.71 14.78 6.45 16.06 5.54 17.63C5.02 18.54 5.33 19.7 6.24 20.22L7.97 21.21C8.76 21.68 9.78 21.4 10.25 20.61L10.36 20.42C11.26 18.85 12.74 18.85 13.65 20.42L13.76 20.61C14.23 21.4 15.25 21.68 16.04 21.21L17.77 20.22C18.68 19.7 18.99 18.53 18.47 17.63C17.56 16.06 18.3 14.78 20.11 14.78C21.15 14.78 22.01 13.93 22.01 12.88V11.12C22 10.08 21.15 9.22 20.1 9.22ZM12 15.25C10.21 15.25 8.75 13.79 8.75 12C8.75 10.21 10.21 8.75 12 8.75C13.79 8.75 15.25 10.21 15.25 12C15.25 13.79 13.79 15.25 12 15.25Z"
              fill="#596780"
            />
          </svg>
        </button>
        <button className={styles.headerProfile} onClick={handleAdminClick}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <circle cx="50" cy="35" r="20" fill="#596780" />
            <path
              d="M30 85C30 70 40 60 50 60C60 60 70 70 70 85"
              fill="#596780"
            />
          </svg>
        </button>
        
        {/* Hamburger Menu - 768px altında görünür */}
        <HamburgerMenu />
      </div>
    </div>
  );
};

export default Header;
