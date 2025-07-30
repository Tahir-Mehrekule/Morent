import styles from "../AdminChartSection/AdminChart.module.scss";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { HiDotsHorizontal } from "react-icons/hi";

const AdminChart = () => {
  const AdminChartData = [
    { name: "Sport Car", value: 17439 },
    { name: "SUV", value: 9478 },
    { name: "Coupe", value: 18197 },
    { name: "Hatchback", value: 12510 },
    { name: "MPV", value: 14406 },
  ];
  const COLORS = ["#0d3459", "#175d9c", "#2084de", "#63a9e8", "#a6cef2"];

  const totalValue = AdminChartData.reduce(
    (total, item) => total + item.value,
    0
  );

  return (
    <div className={styles.AdminChartWrapper}>
      <div className={styles.AdminChartContainer}>
        <div className={styles.AdminChartTitleContainer}>
          <h1 className={styles.AdminChartTitle}>Top 5 Car Rental</h1>
          <HiDotsHorizontal
            style={{ width: 24, height: 24, cursor: "pointer" }}
          />
        </div>
        <div className={styles.ChartWrapper}>
          <PieChart width={300} height={300}>
            <Pie
              data={AdminChartData}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {AdminChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div className={styles.ChartCenterText}>
            <h2>{totalValue.toLocaleString()}</h2>
            <p>Rental Car</p>
          </div>
        </div>
        <div className={styles.AdminChartSideBar}>
          {AdminChartData.map((item, index) => (
            <div key={index} className={styles.SideBarItem}>
              <span
                className={styles.SideBarColor}
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <div className={styles.SideBarText}>
                <p>{item.name}</p>
                <p>{item.value.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminChart;
