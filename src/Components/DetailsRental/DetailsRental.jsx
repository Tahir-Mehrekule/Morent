import { useState } from 'react';
import styles from './DetailsRental.module.scss';
import { HiDotsHorizontal } from "react-icons/hi";
import { FaCalendarAlt, FaCar, FaUsers, FaDollarSign, FaStar } from 'react-icons/fa';

const DetailsRental = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const rentalStats = {
    week: {
      totalRentals: 1247,
      activeRentals: 89,
      completedRentals: 1158,
      revenue: 124700,
      averageRating: 4.8,
      topCategory: 'Sport Car',
      topCar: 'Nissan GT-R'
    },
    month: {
      totalRentals: 5234,
      activeRentals: 156,
      completedRentals: 5078,
      revenue: 523400,
      averageRating: 4.7,
      topCategory: 'SUV',
      topCar: 'BMW X5'
    },
    year: {
      totalRentals: 62478,
      activeRentals: 234,
      completedRentals: 62244,
      revenue: 6247800,
      averageRating: 4.9,
      topCategory: 'Sport Car',
      topCar: 'Koenigsegg'
    }
  };

  const currentStats = rentalStats[selectedPeriod];

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className={styles.statCard}>
      <div className={styles.statIcon} style={{ backgroundColor: color }}>
        <Icon />
      </div>
      <div className={styles.statContent}>
        <h3>{title}</h3>
        <p className={styles.statValue}>{value.toLocaleString()}</p>
        <p className={styles.statSubtitle}>{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className={styles.detailsRentalWrapper}>
      <div className={styles.detailsRentalContainer}>
        <div className={styles.detailsRentalHeader}>
          <div className={styles.headerLeft}>
            <h1 className={styles.detailsRentalTitle}>Rental Details</h1>
            <p className={styles.detailsRentalSubtitle}>Comprehensive rental statistics and insights</p>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.periodSelector}>
              <button 
                className={`${styles.periodBtn} ${selectedPeriod === 'week' ? styles.active : ''}`}
                onClick={() => setSelectedPeriod('week')}
              >
                Week
              </button>
              <button 
                className={`${styles.periodBtn} ${selectedPeriod === 'month' ? styles.active : ''}`}
                onClick={() => setSelectedPeriod('month')}
              >
                Month
              </button>
              <button 
                className={`${styles.periodBtn} ${selectedPeriod === 'year' ? styles.active : ''}`}
                onClick={() => setSelectedPeriod('year')}
              >
                Year
              </button>
            </div>
            <HiDotsHorizontal className={styles.menuIcon} />
          </div>
        </div>

        <div className={styles.statsGrid}>
          <StatCard
            icon={FaCar}
            title="Total Rentals"
            value={currentStats.totalRentals}
            subtitle={`${selectedPeriod} total`}
            color="#0d3459"
          />
          <StatCard
            icon={FaCalendarAlt}
            title="Active Rentals"
            value={currentStats.activeRentals}
            subtitle="Currently rented"
            color="#175d9c"
          />
          <StatCard
            icon={FaUsers}
            title="Completed"
            value={currentStats.completedRentals}
            subtitle="Successfully returned"
            color="#2084de"
          />
          <StatCard
            icon={FaDollarSign}
            title="Revenue"
            value={`$${currentStats.revenue.toLocaleString()}`}
            subtitle="Total earnings"
            color="#63a9e8"
          />
        </div>

        <div className={styles.insightsSection}>
          <div className={styles.ratingCard}>
            <div className={styles.ratingHeader}>
              <FaStar className={styles.starIcon} />
              <h3>Average Rating</h3>
            </div>
            <div className={styles.ratingValue}>
              <span className={styles.ratingNumber}>{currentStats.averageRating}</span>
              <span className={styles.ratingMax}>/5.0</span>
            </div>
            <p className={styles.ratingSubtitle}>Customer satisfaction</p>
          </div>

          <div className={styles.topPerformers}>
            <div className={styles.topCategory}>
              <h3>Top Category</h3>
              <div className={styles.categoryInfo}>
                <span className={styles.categoryName}>{currentStats.topCategory}</span>
                <span className={styles.categoryCount}>Most rented</span>
              </div>
            </div>
            <div className={styles.topCar}>
              <h3>Top Car</h3>
              <div className={styles.carInfo}>
                <span className={styles.carName}>{currentStats.topCar}</span>
                <span className={styles.carStatus}>Most popular</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsRental; 