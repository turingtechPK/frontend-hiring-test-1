import React, { useEffect, useState } from "react";
import CustomTable from "../../Components/Table/CustomTable";
import "./Dashboard.css";
import DropSelect from "../../Components/Dropdown/DropSelect";
import axios from "axios";
import { API_URL } from "../../api_url";
import { Pagination } from "antd";
import { DetailsModal } from "../../Components/DetailsModal/DetailsModal";
const Dashboard = () => {
  const [calls, setCalls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState();

  useEffect(() => {
    getCalls();
  }, [currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const getCalls = () => {
    axios
      .get(`${API_URL}/calls?offset=${currentPage}&limit=${10}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCalls(res.data.nodes);
        setTotal(res.data.totalCount);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="dashboard_container">
      <p className="heading">Turing Technologies Frontend Test</p>
      <div className="filter">
        <p style={{ color: "grey", marginRight: "5px" }}>Filter by: </p>
        <DropSelect calls={calls} setCalls={setCalls} />
      </div>
      <div className="table_container">
        <CustomTable
          callsData={calls}
          setModalOpen={setModalOpen}
          setSelectedCall={setSelectedCall}
        />
        <Pagination
          current={currentPage === 0 ? currentPage + 1 : currentPage}
          onChange={onPageChange}
          total={total}
          showSizeChanger={false}
        />
        <p>
          {currentPage * 10 - 10 + 1} - {currentPage * 10} of{" "}
          {" " + total + " results"}
        </p>
      </div>
      <DetailsModal
        open={modalOpen}
        setModalOpen={setModalOpen}
        selectedCall={selectedCall}
      />
    </div>
  );
};

export default Dashboard;
