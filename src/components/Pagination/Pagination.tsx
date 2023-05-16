import { useEffect, useState } from "react";

interface PropsPagination {
  currentPage: number;
  totalPages: number;
  onPageChange: Function;
}
const FIRST_ITEM = 1;

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PropsPagination) {
  
  const handlePageChange = (pageNumber: number) => {
    if (onPageChange) {
      onPageChange(pageNumber);
    }
  };

  const renderPagination = () => {
    return Array.from({ length: totalPages }, (_, index) => index + 1).map(
      (pageNumber) => (
        <li
          key={pageNumber}
          className={`paginate_button page-item ${
            pageNumber === currentPage ? "active" : ""
          }`}
        >
          <span
            style={{ cursor: "pointer" }}
            aria-controls="dataTable"
            className="page-link"
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </span>
        </li>
      )
    );
  };

  useEffect(() => {
    if (currentPage > FIRST_ITEM && currentPage < totalPages) {
      document
        .getElementById("dataTable_previous")
        ?.classList.remove("disabled");
      document.getElementById("dataTable_next")?.classList.remove("disabled");
    }
    if (currentPage === FIRST_ITEM) {
      document.getElementById("dataTable_previous")?.classList.add("disabled");
      document.getElementById("dataTable_next")?.classList.remove("disabled");
    }
    if (currentPage === totalPages) {
      document
        .getElementById("dataTable_previous")
        ?.classList.remove("disabled");
      document.getElementById("dataTable_next")?.classList.add("disabled");
    }
  }, [currentPage, totalPages]);

  return (
    <ul className="pagination">
      <li
        className="paginate_button page-item previous disabled"
        id="dataTable_previous"
        onClick={() => {
          if (currentPage === FIRST_ITEM) return;
          handlePageChange(currentPage - 1);
        }}
      >
        <span
          aria-controls="dataTable"
          data-dt-idx="0"
          className="page-link"
          style={{ cursor: "pointer" }}
        >
          Previous
        </span>
      </li>
      {renderPagination()}
      <li
        className="paginate_button page-item next disabled"
        id="dataTable_next"
        onClick={(e) => {
          if (currentPage === totalPages) return;
          handlePageChange(currentPage + 1);
        }}
      >
        <span
          style={{ cursor: "pointer" }}
          aria-controls="dataTable"
          data-dt-idx="2"
          className="page-link"
        >
          Next
        </span>
      </li>
    </ul>
  );
}
