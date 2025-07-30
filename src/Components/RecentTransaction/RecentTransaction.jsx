import { useState } from 'react';
import styles from './RecentTransaction.module.scss'; 
import TransactionCard from './TransactionCard/TransactionCard';

const RecentTransaction = () => {
  const [showAll, setShowAll] = useState(false);

  const transactions = [
    {
      id: 1,
      name: 'Nissan GT-R',
      category: 'Sport Car',
      price: 80.0,
      date: '20 July',
      image: '/src/assets/Car Pictures/car-2.png',
    },
    {
      id: 2,
      name: 'Koenigsegg',
      category: 'Sport Car',
      price: 99.0,
      date: '19 July',
      image: '/src/assets/Car Pictures/car-1.png',
    },
    {
      id: 3,
      name: 'Rolls-Royce',
      category: 'Sport Car',
      price: 96.0,
      date: '18 July',
      image: '/src/assets/Car Pictures/car-3.png',
    },
    {
      id: 4,
      name: 'CR-V',
      category: 'SUV',
      price: 80.0,
      date: '17 July',
      image: '/src/assets/Car Pictures/car-5.png',
    },
    {
      id: 1,
      name: 'Nissan GT-R',
      category: 'Sport Car',
      price: 80.0,
      date: '20 July',
      image: '/src/assets/Car Pictures/car-2.png',
    },
    {
      id: 2,
      name: 'Koenigsegg',
      category: 'Sport Car',
      price: 99.0,
      date: '19 July',
      image: '/src/assets/Car Pictures/car-1.png',
    },
    {
      id: 3,
      name: 'Rolls-Royce',
      category: 'Sport Car',
      price: 96.0,
      date: '18 July',
      image: '/src/assets/Car Pictures/car-3.png',
    },
    {
      id: 4,
      name: 'CR-V',
      category: 'SUV',
      price: 80.0,
      date: '17 July',
      image: '/src/assets/Car Pictures/car-5.png',
    },
  ];

  const displayTransactions = showAll ? transactions : transactions.slice(0, 4);

  return (
    <div className={styles.transactionsContainer}>
      <div className={styles.transactionsHeader}>
        <h2>Recent Transaction</h2>
        <button 
          className={styles.viewAll} 
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : 'View All'}
        </button>
      </div>
      <div 
        className={`${styles.transactionsList} ${showAll ? styles.scrollable : ''}`}
      >
        {displayTransactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            image={transaction.image}
            name={transaction.name}
            category={transaction.category}
            price={transaction.price}
            date={transaction.date}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransaction;
