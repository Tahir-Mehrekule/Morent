import style from "./CategoryCarRentPage.module.scss";
import CategoryCar from "../../Components/CategoryCar/CategoryCar";
import FilterSidebar from "../../Components/FilterSidebar/FilterSidebar";
import { useState } from "react";
import { carsData } from "../../constants/index";
import RangePicker from "../../Components/RangePicker/RangePicker";

function CategoryCarRentPage() {
  const [filteredCars, setFilteredCars] = useState(carsData);

  const handleFilterChange = (newFilteredCars) => {
    setFilteredCars(newFilteredCars);
  };

  return (
    <div className={style.CategoryCarRentPageContainer}>
      <RangePicker type="Pick-Up" />
      <div className={style.ContentContainer}>
        <div className={style.FilterSidebarContainer}>
          <FilterSidebar 
            carsData={carsData} 
            onFilterChange={handleFilterChange} 
          />
        </div>
        <div className={style.CarListContainer}>
          <CategoryCar cars={filteredCars} />
        </div>
      </div>
    </div>
  );
}

export default CategoryCarRentPage;
