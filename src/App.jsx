import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import DetailPage from "./Pages/DetailPage/DetailPage";
import CategoryCarRentPage from "./Pages/CategoryCarRentPage/CategoryCarRentPage";
import WishlistPage from "./Pages/WishlistPage/Wishlist";
import NotificationPage from "./Pages/NotificationPage/NotificationPage";
import styles from "./styles/styles.module.scss";
import AdminPage from "./Pages/AdminPage/AdminPage";

// Modal için app element ayarla
Modal.setAppElement('#root');

function App() {
  // Otomatik bildirim sistemi
  useEffect(() => {
    // Test için localStorage'ı temizle (sadece geliştirme aşamasında)
    localStorage.removeItem("autoNotificationSent");
    
    const timer = setTimeout(() => {
      // Eğer daha önce otomatik bildirim gönderilmemişse
      const hasAutoNotification = localStorage.getItem("autoNotificationSent");
      
      if (!hasAutoNotification) {
        // Otomatik promo kod bildirimi oluştur
        const autoNotification = {
          id: Date.now(),
          type: 'promo',
          title: '🎉 Özel Promo Kod Kazandınız!',
          message: 'MORENT10 kodunu kullanarak %10 indirim kazanın! Ödeme sayfasında kullanabilirsiniz.',
          promoCode: 'MORENT10',
          discount: 10,
          timestamp: new Date(),
          isRead: false
        };

        // Mevcut bildirimleri al ve yenisini ekle
        const existingNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
        localStorage.setItem("notifications", JSON.stringify([autoNotification, ...existingNotifications]));
        
        // Header'daki bildirim sayacını güncelle
        window.dispatchEvent(new CustomEvent('notificationsUpdated'));
        
        // Otomatik bildirim gönderildiğini işaretle
        localStorage.setItem("autoNotificationSent", "true");
        
        console.log("🎉 Otomatik bildirim gönderildi!");
      }
    }, 1000); // 1 saniye sonra (test için)

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={styles.root}>
      <Header />
      {/* ToastContainer'ı güncelledik */}
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        stacked // Bildirimleri üst üste bindirmek için bu prop'u ekledik
        limit={3} // Aynı anda en fazla 3 bildirim göster
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:id" element={<DetailPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/category" element={<CategoryCarRentPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;