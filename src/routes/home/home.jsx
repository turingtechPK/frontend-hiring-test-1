import { useState } from "react";
import "./home.scss";
import { useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pages, setPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const [notesText, setNotesText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const handleAllData = () => {
    setFilteredData(data);
  };
  const handleArchived = () => {
    const filterData = data.filter((el) => el.is_archived);
    setFilteredData(filterData);
  };

  const handleUnarchived = () => {
    const filterData = data.filter((el) => !el.is_archived);
    setFilteredData(filterData);
  };

  const openModal = (data) => {
    setModalData(data);
    setModalIsOpen(true);
    setNotesText(data?.notes[0]?.content);
  };

  const handleNote = async (id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/calls/${id}/note`,
        { content: notesText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      closeModal();
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
    }
  };

  const closeModal = () => {
    setModalData({});
    setNotesText("");
    setModalIsOpen(false);
  };

  const customStyles = {
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      padding: "0",
    },
  };
  const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);

  useEffect(() => {
    const newOffset = (currentPage - 1) * limit;
    setOffset(newOffset);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages) setCurrentPage(currentPage + 1);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} mins ${secs} seconds`;
  };

  const convertDateString = (dateString) => {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = String(dateObj.getFullYear());

    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/calls?offset=${offset}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        // Process the response data
        const count = response?.data?.totalCount;
        setPages(Math.ceil(count / limit));
        setData(response?.data?.nodes);
        setFilteredData(response?.data?.nodes);
        setTotalCount(count);
      } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
      }
    };
    fetchData();
  }, [offset, limit]);
  return (
    <div className="home-main">
      <h1 className="home-top-heading">
        Turing Technologies Frontend Test - Moazzam
      </h1>
      <div className="filter-container">
        <div className="filter-left">Filter by:</div>
        <div className="filter-right">
          <button
            className="dropdown-button dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            Status{" "}
          </button>
          <div
            className={open ? "dropdown-menu show" : "dropdown-menu"}
            aria-labelledby="dropdownMenuButton"
          >
            <span
              className={
                filter === "all" ? "dropdown-item selected" : "dropdown-item"
              }
              onClick={() => {
                setFilter("all");
                setOpen(false);
                handleAllData();
              }}
            >
              All
            </span>
            <span
              className={
                filter === "archived"
                  ? "dropdown-item selected"
                  : "dropdown-item"
              }
              onClick={() => {
                setFilter("archived");
                setOpen(false);
                handleArchived();
              }}
            >
              Archived{" "}
            </span>
            <span
              className={
                filter === "unarchived"
                  ? "dropdown-item selected"
                  : "dropdown-item"
              }
              onClick={() => {
                setFilter("unarchived");
                setOpen(false);
                handleUnarchived();
              }}
            >
              Unarchived{" "}
            </span>
          </div>
        </div>
      </div>
      <div className="home-main-container">
        <div className="main-container-box">
          <div className="main-container-headings">
            <span className="main-heading">Call type</span>
            <span className="main-heading">Direction</span>
            <span className="main-heading">Duration</span>
            <span className="main-heading">From</span>
            <span className="main-heading">To</span>
            <span className="main-heading">Via</span>
            <span className="main-heading">Created At</span>
            <span className="main-heading">Status</span>
            <span className="main-heading">Actions</span>
          </div>
          {filteredData.map((node) => {
            return (
              <div className="main-container-all-data">
                {node.call_type === "answered" && (
                  <span
                    className="main-container-data"
                    style={{ color: "green" }}
                  >
                    Answered{" "}
                  </span>
                )}
                {node.call_type === "voicemail" && (
                  <span
                    className="main-container-data"
                    style={{ color: "blue" }}
                  >
                    Voice Mail{" "}
                  </span>
                )}
                {node.call_type === "missed" && (
                  <span
                    className="main-container-data"
                    style={{ color: "red" }}
                  >
                    Missed{" "}
                  </span>
                )}
                <span className="main-container-data" style={{ color: "blue" }}>
                  {node.direction === "inbound" ? "Inbound" : "Outbound"}{" "}
                </span>
                <span className="main-container-data">
                  {formatTime(node.duration)}
                  <br />{" "}
                  <span style={{ color: "blue" }}>
                    ({node.duration} seconds)
                  </span>
                </span>
                <span className="main-container-data">{node.from} </span>
                <span className="main-container-data">{node.to} </span>
                <span className="main-container-data">{node.via} </span>
                <span className="main-container-data">
                  {convertDateString(node.created_at)}{" "}
                </span>
                <span className="main-container-data">
                  {node.is_archived ? (
                    <span className="archived">Archived</span>
                  ) : (
                    <span className="unarchived">Unarchive</span>
                  )}{" "}
                </span>
                <span className="main-container-data">
                  <span className="action" onClick={() => openModal(node)}>
                    Add Note
                  </span>{" "}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pagination-container">
        <div className="pagination">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item" style={{ border: "none" }}>
                <a
                  className="page-link"
                  aria-label="Previous"
                  onClick={handlePreviousPage}
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>

              {pageNumbers.map((page) => (
                <li className="page-item">
                  <a
                    className={
                      currentPage === page
                        ? "page-link selected-page"
                        : "page-link"
                    }
                    onClick={() => {
                      setCurrentPage(page);
                      setOffset((page - 1) * limit);
                    }}
                  >
                    {page}
                  </a>
                </li>
              ))}

              <li className="page-item">
                <a
                  className="page-link"
                  aria-label="Next"
                  onClick={handleNextPage}
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="results">
          {`${offset + 1} -- ${
            offset + limit > totalCount ? totalCount : offset + limit
          } of ${totalCount} results`}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <div className="note-main-container">
          <div className="note-container-top">
            <div>
              <h1 className="note-header">Add Notes</h1>
              <span className="call-id">Call Id: {modalData?.id}</span>
            </div>
            <span className="cross-icon" onClick={() => closeModal()}>
              X
            </span>
          </div>
          <div className="border-modal"></div>
          <div className="notes-bottom-container">
            <div className="bottom-container-row">
              <div className="container-left-item">Call Type</div>
              <div className="container-right-item" style={{ color: "blue" }}>
                {" "}
                {modalData?.call_type === "voicemail" && "Voice Mail"}
              </div>
              <div className="container-right-item" style={{ color: "red" }}>
                {" "}
                {modalData?.call_type === "missed" && "Missed"}
              </div>
              <div className="container-right-item" style={{ color: "green" }}>
                {" "}
                {modalData?.call_type === "answered" && "Answered"}
              </div>
            </div>
            <div className="bottom-container-row">
              <div className="container-left-item">Duration</div>
              <div className="container-right-item">
                {" "}
                {modalData?.duration && formatTime(modalData?.duration)}
              </div>
            </div>
            <div className="bottom-container-row">
              <div className="container-left-item">From</div>
              <div className="container-right-item"> {modalData?.from}</div>
            </div>
            <div className="bottom-container-row">
              <div className="container-left-item">To</div>
              <div className="container-right-item"> {modalData?.to}</div>
            </div>
            <div className="bottom-container-row">
              <div className="container-left-item">Via</div>
              <div className="container-right-item"> {modalData?.via}</div>
            </div>

            <div className="notes">Notes</div>
            <input
              type="text-area"
              className="notes-text"
              placeholder="Add Notes"
              value={notesText}
              onChange={(event) => setNotesText(event.target.value)}
            />
          </div>
          <div className="border-modal"></div>
        </div>{" "}
        <div style={{ padding: "0 30px", marginBottom: "20px" }}>
          <div
            className="save-button"
            onClick={() => handleNote(modalData?.id)}
          >
            Save
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
