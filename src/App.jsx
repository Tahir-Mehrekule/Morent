import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import DetailPage from "./Pages/DetailPage/DetailPage";
import CategoryCarRentPage from "./Pages/CategoryCarRentPage/CategoryCarRentPage";
import WishlistPage from "./Pages/WishlistPage/Wishlist";
import styles from "./styles/styles.module.scss";
import AdminPage from "./Pages/AdminPage/AdminPage";

function App() {
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
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;