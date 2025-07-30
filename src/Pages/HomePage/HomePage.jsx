import { useState } from "react";
import PopulerCars from "../../Components/PopulerCars/PopulerCars";
import { carsData } from "../../constants/index";
import RecommendedCars from "../../Components/RecommendedCars/RecommendedCars";
import RangePicker from "../../Components/RangePicker/RangePicker";

const Home = () => {
  const [filteredCars] = useState(carsData);

  return (
    <>
      <RangePicker />
      <PopulerCars carsData={filteredCars} />
      <RecommendedCars carsData={filteredCars} />
    </>
  );
};

export default Home;
