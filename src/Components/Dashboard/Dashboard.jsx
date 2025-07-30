import AdminChart from "../AdminChartSection/AdminChart";
import AdminSideBar from "../AdminSideBar/AdminSideBar"
import RecentTransaction from "../RecentTransaction/RecentTransaction"
import styles from "./Dashboard.module.scss";
const Dashboard = () => {
    return(
        <div className={styles.adminPanelContainer}>
            <AdminSideBar/>
            <div className={styles.dashboardContainer}>
                <AdminChart/> Details Rental gelicek
                <div className={styles.dashboardSubContainer}>
                    <AdminChart/> 
                    <RecentTransaction/>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;