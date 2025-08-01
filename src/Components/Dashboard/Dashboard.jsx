import AdminChart from "../AdminChartSection/AdminChart";
import AdminSideBar from "../AdminSideBar/AdminSideBar"
import RecentTransaction from "../RecentTransaction/RecentTransaction"
import DetailsRental from "../DetailsRental/DetailsRental"
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
    return(
        <div className={styles.adminPanelContainer}>
            <AdminSideBar/>
            <div className={styles.dashboardContainer}>
                {/* 1. Satır: Top 5 Car Rental + Top 5 Car Rental */}
                <div className={styles.dashboardRow}>
                    <AdminChart/>
                    <AdminChart/>
                </div>
                {/* 2. Satır: Rental Details + Recent Transaction */}
                <div className={styles.dashboardRow}>
                    <DetailsRental/>
                    <RecentTransaction/>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;