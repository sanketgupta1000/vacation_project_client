import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setInfo } from "../slices";
import { categoryService } from "../services";

function BookSearchBar({ setFilterState }) {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.auth.token);

  const [showFilters, setShowFilters] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showPageCount, setShowPageCount] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("title");
  const [categories, setCategories] = useState([]);
  const [minPageCount, setMinPageCount] = useState(0);
  const [maxPageCount, setMaxPageCount] = useState(0);

  const [allCategories, setAllCategories] = useState([]);
  async function fetchCategories() {
    dispatch(setLoading({ isLoading: true, loadingMsg: "Loading..." }));

    try {
      const response = await categoryService.getAllCategories(jwt);

      if (!response.ok) {
        throw new Error((await response.json()).message);
      }

      // all good
      const data = await response.json();
      setAllCategories(data);
    } catch (error) {
      dispatch(
        setInfo({ shouldShow: true, infoMsg: error.message, infoType: "error" })
      );
      navigate("/");
    } finally {
      dispatch(setLoading({ isLoading: false, loadingMsg: "" }));
    }
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  const criteriaOptions = [
    { id: 1, value: "title", displayText: "Title" },
    { id: 2, value: "author", displayText: "Author" },
    { id: 3, value: "owner", displayText: "Owner" },
    { id: 4, value: "city", displayText: "City" },
  ];
  const pageCountOptions = [
    { id: 1, lowerLimit: 1, upperLimit: 100 },
    { id: 2, lowerLimit: 101, upperLimit: 200 },
    { id: 3, lowerLimit: 201, upperLimit: 300 },
    { id: 4, lowerLimit: 301, upperLimit: 400 },
    { id: 5, lowerLimit: 401, upperLimit: 500 },
    { id: 6, lowerLimit: 501, upperLimit: 0 },
  ];

  const handleFilterApply = function () {
    setFilterState(
      filterText,
      filterCriteria,
      categories,
      minPageCount,
      maxPageCount
    );
  };
  const handleFilterClear = function () {
    setFilterText("");
    setFilterCriteria("title");
    setCategories([]);
    setMinPageCount(0);
    setMaxPageCount(0);
    setFilterState(null, null, [], 0, 0);
  };

  const handleCategoryChange = (category) => {
    setCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        // Remove category if it's already selected
        return prevCategories.filter((item) => item !== category);
      } else {
        // Add category if it's not selected
        return [...prevCategories, category];
      }
    });
  };

  const handlePageCountSelection = (option) => {
    setMinPageCount(option.lowerLimit);
    setMaxPageCount(option.upperLimit);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white ">
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search for books..."
          className="flex-grow px-4 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button
          onClick={handleFilterApply}
          className="px-4 py-2 bg-green-600 text-white rounded-md focus:outline-none focus:ring"
        >
          Filter
        </button>
        <button
          onClick={handleFilterClear}
          className="px-4 py-2 bg-red-600 text-white rounded-md focus:outline-none focus:ring"
        >
          Clear
        </button>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md focus:outline-none focus:ring"
        >
          {showCategories ? "Hide Filters" : "Show Filters"}
        </button>
      </div>
      {showFilters && (
        <div className="bg-gray-700 p-4 rounded-lg shadow-inner">
          <div className="mb-4">
            <label htmlFor="filterBy" className="block mb-2 text-gray-400">
              Filter by
            </label>
            <select
              id="filterBy"
              className="w-full px-4 py-2 bg-gray-800 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              onChange={(e) => setFilterCriteria(e.target.value)}
            >
              {criteriaOptions.map((option) => (
                <option
                  key={option.id}
                  value={option.value}
                  selected={filterCriteria === option.value}
                >
                  {option.displayText}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring"
            >
              {showCategories ? "Hide Categories" : "Show Categories"}
            </button>
            {showCategories && (
              <div className="mt-2">
                <label className="block mb-2 text-gray-400">Categories</label>
                <div className="flex flex-col space-y-2">
                  {allCategories.map((category) => (
                    <label
                      key={category.categoryId}
                      className="inline-flex items-center"
                    >
                      <input
                        type="checkbox"
                        checked={categories.includes(category.categoryId)}
                        onChange={() =>
                          handleCategoryChange(category.categoryId)
                        }
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2">{category.categoryName}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mb-4">
            <button
              onClick={() => setShowPageCount(!showPageCount)}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring"
            >
              {showPageCount ? "Hide Page Count" : "Show Page Count"}
            </button>
            {showPageCount && (
              <div className="mt-2">
                <label className="block mb-2 text-gray-400">Page Count</label>
                <div className="flex flex-col space-y-2">
                  {pageCountOptions.map((option) => (
                    <label key={option.id} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="pageCount"
                        className="form-radio h-5 w-5 text-blue-600"
                        onChange={() => handlePageCountSelection(option)}
                      />
                      <span className="ml-2">{`${option.lowerLimit}${
                        option.upperLimit ? " - " + option.upperLimit : "+"
                      } pages`}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BookSearchBar;
