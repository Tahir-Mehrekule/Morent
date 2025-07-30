import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HamburgerMenu.module.scss";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Dışarı tıklama algılama
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className={styles.hamburgerContainer} ref={menuRef}>
      {/* Hamburger Button */}
      <button 
        className={`${styles.hamburgerButton} ${isOpen ? styles.open : ''}`}
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
      </button>

      {/* Menu Dropdown */}
      {isOpen && (
        <div className={styles.menuDropdown}>
          <div className={styles.menuOverlay} onClick={() => setIsOpen(false)} />
          <div className={styles.menuContent}>
            <div className={styles.menuHeader}>
              <h3>Menu</h3>
              <button 
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>
            
            <nav className={styles.menuNav}>
              <button 
                className={styles.menuItem}
                onClick={() => handleNavigation("/wishlist")}
              >
                <div className={styles.menuIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69001C2 5.60001 4.49 3.10001 7.56 3.10001C9.38 3.10001 10.99 3.98001 12 5.34001C13.01 3.98001 14.63 3.10001 16.44 3.10001C19.51 3.10001 22 5.60001 22 8.69001C22 15.69 15.52 19.82 12.62 20.81Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Favoriler</span>
              </button>

              <button className={styles.menuItem}>
                <div className={styles.menuIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M19.3399 14.49L18.3399 12.83C18.1299 12.46 17.9399 11.76 17.9399 11.35V8.82C17.9399 6.47 16.5599 4.44 14.5699 3.49C14.0499 2.57 13.0899 2 11.9899 2C10.8999 2 9.91994 2.59 9.39994 3.52C7.44994 4.49 6.09994 6.5 6.09994 8.82V11.35C6.09994 11.76 5.90994 12.46 5.69994 12.82L4.68994 14.49C4.28994 15.16 4.19994 15.9 4.44994 16.58C4.68994 17.25 5.25994 17.77 5.99994 18.02C7.93994 18.68 9.97994 19 12.0199 19C14.0599 19 16.0999 18.68 18.0399 18.03C18.7399 17.8 19.2799 17.27 19.5399 16.58C19.7999 15.89 19.7299 15.13 19.3399 14.49Z"
                      fill="currentColor"
                    />
                    <path
                      d="M14.8302 20.01C14.4102 21.17 13.3002 22 12.0002 22C11.2102 22 10.4302 21.68 9.88018 21.11C9.56018 20.81 9.32018 20.41 9.18018 20C9.31018 20.02 9.44018 20.03 9.58018 20.05C9.81018 20.08 10.0502 20.11 10.2902 20.13C10.8602 20.18 11.4402 20.21 12.0202 20.21C12.5902 20.21 13.1602 20.18 13.7202 20.13C13.9302 20.11 14.1402 20.1 14.3402 20.07C14.5002 20.05 14.6602 20.03 14.8302 20.01Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span>Bildirimler</span>
                <div className={styles.notificationBadge}></div>
              </button>

              <button className={styles.menuItem}>
                <div className={styles.menuIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20.1 9.22C18.29 9.22 17.55 7.94 18.45 6.37C18.97 5.46 18.66 4.3 17.75 3.78L16.02 2.79C15.23 2.32 14.21 2.6 13.74 3.39L13.63 3.58C12.73 5.15 11.25 5.15 10.34 3.58L10.23 3.39C9.78 2.6 8.76 2.32 7.97 2.79L6.24 3.78C5.33 4.3 5.02 5.47 5.54 6.38C6.45 7.94 5.71 9.22 3.9 9.22C2.86 9.22 2 10.07 2 11.12V12.88C2 13.92 2.85 14.78 3.9 14.78C5.71 14.78 6.45 16.06 5.54 17.63C5.02 18.54 5.33 19.7 6.24 20.22L7.97 21.21C8.76 21.68 9.78 21.4 10.25 20.61L10.36 20.42C11.26 18.85 12.74 18.85 13.65 20.42L13.76 20.61C14.23 21.4 15.25 21.68 16.04 21.21L17.77 20.22C18.68 19.7 18.99 18.53 18.47 17.63C17.56 16.06 18.3 14.78 20.11 14.78C21.15 14.78 22.01 13.93 22.01 12.88V11.12C22 10.08 21.15 9.22 20.1 9.22ZM12 15.25C10.21 15.25 8.75 13.79 8.75 12C8.75 10.21 10.21 8.75 12 8.75C13.79 8.75 15.25 10.21 15.25 12C15.25 13.79 13.79 15.25 12 15.25Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span>Ayarlar</span>
              </button>

              <button 
                className={styles.menuItem}
                onClick={() => handleNavigation("/admin")}
              >
                <div className={styles.menuIcon}>
                  <svg width="20" height="20" viewBox="0 0 100 100">
                    <circle cx="50" cy="35" r="20" fill="currentColor" />
                    <path
                      d="M30 85C30 70 40 60 50 60C60 60 70 70 70 85"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span>Profil</span>
              </button>

              <div className={styles.menuDivider}></div>

              <button 
                className={styles.menuItem}
                onClick={() => handleNavigation("/")}
              >
                <div className={styles.menuIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9.02 2.84L3.63 7.04C2.73 7.74 2 9.23 2 10.36V19.77C2 21.09 3.02 22.16 4.34 22.16H8.26C9.58 22.16 10.6 21.09 10.6 19.77V16.88C10.6 16.22 11.15 15.67 11.81 15.67H12.19C12.85 15.67 13.4 16.22 13.4 16.88V19.77C13.4 21.09 14.42 22.16 15.74 22.16H19.66C20.98 22.16 22 21.09 22 19.77V10.36C22 9.23 21.27 7.74 20.37 7.04L14.98 2.84C13.54 1.64 10.46 1.64 9.02 2.84Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span>Ana Sayfa</span>
              </button>

              <button 
                className={styles.menuItem}
                onClick={() => handleNavigation("/category")}
              >
                <div className={styles.menuIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18.92 6.01C18.72 5.42 18.16 5.01 17.5 5.01H6.5C5.84 5.01 5.28 5.42 5.08 6.01L3.13 11.01C2.86 11.77 3.34 12.6 4.16 12.77C4.2 12.78 4.24 12.78 4.28 12.78H19.72C19.76 12.78 19.8 12.78 19.84 12.77C20.66 12.6 21.14 11.77 20.87 11.01L18.92 6.01Z"
                      fill="currentColor"
                    />
                    <path
                      d="M3.5 14.01V18.01C3.5 19.66 4.84 21.01 6.5 21.01H17.5C19.16 21.01 20.5 19.66 20.5 18.01V14.01H3.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span>Araçlar</span>
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;