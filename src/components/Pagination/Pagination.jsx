import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "./Pagination.css";

function Pagination({
  handleNextPage,
  handlePrevPage,
  pageIndexes,
  setCurrentPage,
  offset,
  totalRecords,
  currentPage,
}) {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center gap-3 text-center">
        <MdChevronLeft
          onClick={handlePrevPage}
          size={20}
          color="grey"
          cursor={"pointer"}
        />
        <div className="d-flex align-items-center gap-3">
          {pageIndexes.map((item, index) => (
            <button
              className="index-btn"
              key={index}
              onClick={() => setCurrentPage(item)}
              style={currentPage === item ? styles.curr_pg : null}
            >
              {item}
            </button>
          ))}
        </div>
        <MdChevronRight
          onClick={handleNextPage}
          size={20}
          color="grey"
          cursor={"pointer"}
        />
      </div>

      <p className="text-center  pag-info-txt mt-2">
        {offset + 1} - {offset + 10 > totalRecords ? totalRecords : offset + 10}{" "}
        of {totalRecords} results
      </p>
    </>
  );
}

const styles = {
  curr_pg: {
    backgroundColor: "#4f46f8",
    color: "#FFF",
  },
};
export default Pagination;
