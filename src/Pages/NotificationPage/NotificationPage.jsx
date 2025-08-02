import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import styles from './NotificationPage.module.scss';
import { carsData } from '../../constants';

const NotificationPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPromoCode, setSelectedPromoCode] = useState(null);

  useEffect(() => {
    // localStorage'dan bildirimleri al
    const loadNotifications = () => {
      const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
      
      // Eğer localStorage'da bildirim yoksa, örnek bildirimler ekle
      if (storedNotifications.length === 0) {
        const mockNotifications = [
          {
            id: 1,
            type: 'discount',
            title: 'Nissan GT-R İndirimi!',
            message: 'Nissan GT-R fiyatı $80.00/gün\'den $60.00/gün\'e düştü!',
            carId: 1,
            carName: 'Nissan GT-R',
            oldPrice: 80,
            newPrice: 60,
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 saat önce
            isRead: false
          },
          {
            id: 2,
            type: 'discount',
            title: 'Audi A8 İndirimi!',
            message: 'Audi A8 fiyatı $90.00/gün\'den $75.00/gün\'e düştü!',
            carId: 3,
            carName: 'Audi A8',
            oldPrice: 90,
            newPrice: 75,
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 saat önce
            isRead: true
          },
          {
            id: 3,
            type: 'discount',
            title: 'Rolls Royce İndirimi!',
            message: 'Rolls Royce fiyatı $150.00/gün\'den $120.00/gün\'e düştü!',
            carId: 11,
            carName: 'Rolls Royce',
            oldPrice: 150,
            newPrice: 120,
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 saat önce
            isRead: false
          }
        ];
        
        localStorage.setItem("notifications", JSON.stringify(mockNotifications));
        setNotifications(mockNotifications);
      } else {
        // Timestamp'leri Date objesine çevir
        const notificationsWithDate = storedNotifications.map(notification => ({
          ...notification,
          timestamp: new Date(notification.timestamp)
        }));
        setNotifications(notificationsWithDate);
      }
    };

    loadNotifications();

    // Storage değişikliklerini dinle
    const handleStorageChange = () => {
      loadNotifications();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} dakika önce`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} saat önce`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} gün önce`;
    }
  };

  const handleNotificationClick = (notification) => {
    // Bildirimi okundu olarak işaretle
    const updatedNotifications = notifications.map(notif => 
      notif.id === notification.id 
        ? { ...notif, isRead: true }
        : notif
    );
    
    setNotifications(updatedNotifications);
    
    // localStorage'ı güncelle
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    
    // Header'daki bildirim sayacını güncellemek için custom event dispatch et
    window.dispatchEvent(new CustomEvent('notificationsUpdated'));

    // İndirim bildirimlerinde araç detay sayfasına yönlendir
    if (notification.type === 'discount') {
      navigate(`/details/${notification.carId}`);
    }
    // Wishlist bildirimlerinde wishlist sayfasına yönlendir
    else if (notification.type === 'wishlist') {
      navigate('/wishlist');
    }
    // Promo kod bildirimlerinde modal aç
    else if (notification.type === 'promo') {
      setSelectedPromoCode(notification);
      setIsModalOpen(true);
    }
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({ ...notif, isRead: true }));
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    
    // Header'daki bildirim sayacını güncellemek için custom event dispatch et
    window.dispatchEvent(new CustomEvent('notificationsUpdated'));
  };

  const deleteAllNotifications = () => {
    if (window.confirm("Tüm bildirimleri silmek istediğinizden emin misiniz?")) {
      setNotifications([]);
      localStorage.setItem("notifications", JSON.stringify([]));
      
      // Header'daki bildirim sayacını güncellemek için custom event dispatch et
      window.dispatchEvent(new CustomEvent('notificationsUpdated'));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPromoCode(null);
  };

  const copyToClipboard = () => {
    if (selectedPromoCode) {
      navigator.clipboard.writeText(selectedPromoCode.promoCode);
      alert('Promo kod kopyalandı!');
    }
  };

  const goToPayment = () => {
    closeModal();
    navigate('/payment');
  };

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  return (
    <div className={styles.notificationPage}>
      <div className={styles.notificationHeader}>
        <h1>Bildirimler</h1>
        <div className={styles.headerButtons}>
          {unreadCount > 0 && (
            <button 
              className={styles.markAllReadBtn}
              onClick={markAllAsRead}
            >
              Tümünü Okundu İşaretle
            </button>
          )}
          {notifications.length > 0 && (
            <button 
              className={styles.deleteAllBtn}
              onClick={deleteAllNotifications}
            >
              Tüm Bildirimleri Sil
            </button>
          )}
        </div>
      </div>

      <div className={styles.notificationList}>
        {notifications.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔔</div>
            <h3>Henüz bildiriminiz yok</h3>
            <p>Yeni indirimler ve güncellemeler burada görünecek</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`${styles.notificationItem} ${!notification.isRead ? styles.unread : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className={styles.notificationIcon}>
                {notification.type === 'discount' ? '💰' : 
                 notification.type === 'promo' ? '🎉' : '❤️'}
              </div>
              
              <div className={styles.notificationContent}>
                <div className={styles.notificationHeader}>
                  <h3>{notification.title}</h3>
                  <span className={styles.timestamp}>
                    {formatTimeAgo(notification.timestamp)}
                  </span>
                </div>
                
                <p className={styles.notificationMessage}>
                  {notification.message}
                </p>

                {notification.type === 'discount' && (
                  <div className={styles.priceInfo}>
                    <span className={styles.oldPrice}>${notification.oldPrice}</span>
                    <span className={styles.newPrice}>${notification.newPrice}</span>
                    <span className={styles.perDay}>/gün</span>
                  </div>
                )}
                
                {notification.type === 'promo' && (
                  <div className={styles.priceInfo}>
                    <span className={styles.newPrice}>%{notification.discount} İndirim</span>
                    <span className={styles.perDay}>Kod: {selectedPromoCode?.promoCode}</span>
                  </div>
                )}
              </div>

              {!notification.isRead && (
                <div className={styles.unreadIndicator}></div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Promo Kod Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
        contentLabel="Promo Kod Detayları"
      >
        {selectedPromoCode && (
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>🎉 Promo Kod Kazandınız!</h2>
              <button className={styles.closeButton} onClick={closeModal}>
                ✕
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.promoCodeDisplay}>
                <h3>Promo Kodunuz:</h3>
                <div className={styles.codeBox}>
                  <span className={styles.promoCode}>{selectedPromoCode.promoCode}</span>
                  <button className={styles.copyButton} onClick={copyToClipboard}>
                    📋 Kopyala
                  </button>
                </div>
              </div>
              
              <div className={styles.promoDetails}>
                <p><strong>İndirim:</strong> %{selectedPromoCode.discount}</p>
                <p><strong>Kullanım:</strong> Ödeme sayfasında promo kod alanına yapıştırın</p>
                <p><strong>Geçerlilik:</strong> Sınırsız</p>
              </div>
              
              <div className={styles.modalActions}>
                <button className={styles.paymentButton} onClick={goToPayment}>
                  💳 Ödeme Sayfasına Git
                </button>
                <button className={styles.closeModalButton} onClick={closeModal}>
                  Kapat
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NotificationPage; 