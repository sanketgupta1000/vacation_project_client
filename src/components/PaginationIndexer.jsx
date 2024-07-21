import { useNavigate } from "react-router-dom";

function PaginationIndexer({ pageNumber = 1, totalPages, setPageNumber }) {
  const navigate = useNavigate();
  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      <button
        onClick={handlePrevPage}
        disabled={pageNumber === 1}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-md transition duration-200"
      >
        &laquo; Previous
      </button>

      <span className="text-lg font-semibold">
        Page {pageNumber} of {totalPages}
      </span>

      <button
        onClick={handleNextPage}
        disabled={pageNumber === totalPages}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-md transition duration-200"
      >
        Next &raquo;
      </button>
    </div>
  );
}

export default PaginationIndexer;
