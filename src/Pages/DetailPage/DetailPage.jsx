import { useParams } from "react-router-dom";
import styles from "./DetailPage.module.scss";
import DetailedProduct from "../../Components/DetailedProduct/DetailedProduct";
import ReviewSection from "../../Components/Review/ReviewSection";
import RecentCars from "../../Components/RecentCarsSection/RecentCarsSection";
import RecommendedCars from "../../Components/RecommendedCars/RecommendedCars";
import { carsData } from "../../constants/index";

const Detail = () => {
  const { id } = useParams();
  return (
    <div>
      <DetailedProduct id={id} />
      <div className={styles.ReviewSectionMargin}>
        <ReviewSection />
      </div>
      <RecentCars />
      <RecommendedCars carsData={carsData} />
    </div>
  );
};

export default Detail;