import React from "react";
import CustomTable from "../../Components/Table/CustomTable";
import "./Dashboard.css";
import DropSelect from "../../Components/Dropdown/Dropdown";
const Dashboard = () => {
  return (
    <div className="dashboard_container">
      <div className="heading">
        <p>Turing Technologies Frontend Test</p>
      </div>
      <div className="filter">
        <p style={{ color: "#2F2F2F", marginRight: "5px" }}>Filter by: </p>
        <DropSelect />
      </div>
      <CustomTable />
    </div>
  );
};

export default Dashboard;
