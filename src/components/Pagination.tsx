import React from "react";

interface PaginationProps {
  currentPage: number;
  setPage: (page: number) => void;
  hasNextPage: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setPage,
  hasNextPage,
}) => {
  return (
    <div>
      <button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={() => setPage(currentPage + 1)} disabled={!hasNextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
