import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CallTable from "../components/CallTable";
import Dropdown from "../components/dropDown";
import TTLogo from ".././assets/TTLogo.png";
const Dashboard = ({ token, onLogout }) => {
  const [filter, setFilter] = useState("All");
  const options = ["All", "Archived", "Unarchived"];
  const navigate = useNavigate();

  const handleFilterChange = (selectedOption) => {
    setFilter(selectedOption);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <>
      <header className="App-header font-avenir">
        <div className="flex justify-between m-2 p-4 border">
          <div>
            <img src={TTLogo} alt="TT Logo" width={300} height={200} />
          </div>
          <div className="">
            {token && (
              <button
                className="px-5 py-1 bg-blue-700 text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>
      <div className="mx-10 font-avenir">
        <p className="text-2xl font-semibold text-gray-700">Turing Technologies Test Frontend</p>
        <div className="my-4 flex">
          <Dropdown
            options={options}
            label="Filter by"
            onSelect={handleFilterChange}
          />
        </div>
        <CallTable filter={filter} />
    
      </div>
    </>
  );
};

export default Dashboard;
