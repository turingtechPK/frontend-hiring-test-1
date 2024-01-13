import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import api from "../../services/api";
import Pagination from "../../components/Pagination/Pagination";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import AppLoader from "../../components/AppLoader/AppLoader";
import CallDetailModal from "../../components/CallDetailsModal/CallDetailsModal";
import "./Calls.css";

function Calls() {
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [currFilter, setCurrFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageIndexes, setPageIndexes] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const limit = 10; // Desired number of records per page

  // Details modal state
  const [currItemData, setCurrItemData] = useState(null);
  const [detailModal, setDetailModal] = useState(false);

  const setDetailModalData = (data) => {
    setCurrItemData(data);
    setDetailModal(true);
  };

  const offset = (currentPage - 1) * limit;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setDetailModal(false);
        const res = await api.get(`/calls?offset=${offset}&limit=${limit}`);

        setTotalRecords(res.data.totalCount);
        setData(res.data);
        setFilteredData(res.data);

        const totalPages = Math.ceil(res.data.totalCount / limit);

        // Create an array of page indexes from 1 to totalPages
        const indexes = Array.from({ length: totalPages }, (_, i) => i + 1);

        setPageIndexes(indexes);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  function filterByStatus(status) {
    const newData = data.filter((item) => item.status === status);
    setFilteredData(newData);
  }

  const handleNextPage = () => {
    if (data.hasNextPage) {
      setCurrentPage((prevValue) => prevValue + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevValue) => prevValue - 1);
    }
  };
  const capitalize = (string) => {
    if (string) return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minutes ${remainingSeconds} seconds`;
  };

  const getCallTypeStyle = (callType) => {
    switch (callType) {
      case "voicemail":
        return styles.call_type_voicemail;
      case "missed":
        return styles.call_type_missed;
      case "answered":
        return styles.call_type_answered;

      default:
        break;
    }
    return styles.t_data;
  };

  return (
    <Container className="p-4" fluid>
      <h3>Turing Technologies Frontend Test</h3>

      <div className="d-flex align-items-center mb-2 mt-4">
        <p className="m-0">Filter by: </p>
        <DropdownButton id="dropdown-basic-button" title="Status">
          <Dropdown.Item className="custom-dropdown-item">All</Dropdown.Item>
          <Dropdown.Item className="custom-dropdown-item">
            Archived
          </Dropdown.Item>
          <Dropdown.Item className="custom-dropdown-item">
            Unarchived
          </Dropdown.Item>
        </DropdownButton>
      </div>

      <Table style={{ border: "1px solid lightgrey" }} hover>
        <thead>
          <tr>
            <th style={styles.t_header}>CALL TYPE</th>
            <th style={styles.t_header}>DIRECTION</th>
            <th style={styles.t_header}>DURATION</th>
            <th style={styles.t_header}>FROM</th>
            <th style={styles.t_header}>TO</th>
            <th style={styles.t_header}>VIA</th>
            <th style={styles.t_header}>CREATED AT</th>
            <th style={styles.t_header}>STATUS</th>
            <th style={styles.t_header}>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.nodes?.length > 0 &&
            filteredData.nodes.map((item) => (
              <tr>
                <td
                  className="align-middle"
                  style={getCallTypeStyle(item.call_type)}
                >
                  {capitalize(item.call_type)}
                </td>
                <td className="align-middle" style={styles.t_data}>
                  {capitalize(item?.direction)}
                </td>
                <td className="align-middle" style={styles.t_data_time}>
                  {formatTime(item?.duration)} <br />
                  <span style={styles.t_data}>({item?.duration} seconds)</span>
                </td>
                <td className="align-middle" style={styles.t_data_secondary}>
                  {item?.from}
                </td>
                <td className="align-middle" style={styles.t_data_secondary}>
                  {item?.to}
                </td>
                <td className="align-middle" style={styles.t_data_secondary}>
                  {item?.via}
                </td>
                <td className="align-middle" style={styles.t_data_secondary}>
                  {new Date(item.created_at)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "-")}
                </td>
                <td className="align-middle">
                  <span
                    style={
                      item.is_archived
                        ? styles.t_data_archive
                        : styles.t_data_unarchive
                    }
                  >
                    {item?.is_archived ? "Archived" : "Unarchive"}
                  </span>
                </td>
                <td className="align-middle" style={styles.t_data}>
                  <button
                    onClick={() => setDetailModalData(item)}
                    className="add-btn"
                  >
                    Add Note
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {/* pagination */}
      <Pagination
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        currentPage={currentPage}
        pageIndexes={pageIndexes}
        setCurrentPage={setCurrentPage}
        offset={offset}
        totalRecords={totalRecords}
      />

      {/* Loader */}
      <AppLoader loading={loading} />

      {/* Call details modal */}
      <CallDetailModal
        data={currItemData}
        show={detailModal}
        handleClose={() => setDetailModal(false)}
      />
    </Container>
  );
}

export default Calls;

const styles = {
  t_header: {
    color: "#232323",
    fontSize: "12px",
  },
  t_data: {
    color: "#325AE7",
    fontSize: "12px",
    fontWeight: "500",
  },
  t_data_secondary: {
    color: "#000",
    fontSize: "12px",
    fontWeight: "500",
  },
  t_data_time: {
    color: "#000",
    fontSize: "12px",
  },

  call_type_voicemail: {
    color: "#325AE7",
    fontSize: "12px",
    fontWeight: "500",
  },
  call_type_missed: {
    color: "#C91D3E",
    fontWeight: "500",
    fontSize: "12px",
  },
  call_type_answered: {
    color: "#1DC9B7",
    fontSize: "12px",
    fontWeight: "500",
  },
  t_data_archive: {
    color: "#1DC9B7",
    fontSize: "12px",
    fontWeight: "500",
    backgroundColor: "rgba(29, 201, 183, 0.0784)",
    padding: "6px 10px",
    borderRadius: "2px",
  },
  t_data_unarchive: {
    color: "#727272",
    fontSize: "12px",
    fontWeight: "500",
    backgroundColor: "rgba(114,114,114, 0.12)",
    padding: "6px 10px",
    borderRadius: "2px",
  },
};
