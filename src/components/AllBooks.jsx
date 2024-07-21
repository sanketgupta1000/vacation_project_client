import React, { useEffect, useState } from "react";
import { BookCard, BookSearchBar, BackGround, PaginationIndexer } from ".";
import { useSelector, useDispatch } from "react-redux";
import { setInfo, setLoading, setAvailableBooks } from "../slices";
import { bookService } from "../services";
import { useNavigate } from "react-router-dom";

function AllBooks() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = useSelector((state) => state.auth.token);
  const availableBooks = useSelector((state) => state.book.availableBooks);

  const [pageNumber, setPageNumber] = useState(1);

  const [totalPages, setTotalPages] = useState();
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [owner, setOwner] = useState(null);
  const [city, setCity] = useState(null);
  const [categories, setCategories] = useState([]);
  const [minPageCount, setMinPageCount] = useState(0);
  const [maxPageCount, setMaxPageCount] = useState(0);

  const setFilterState = function (
    text,
    criteria,
    categories,
    minPageCount,
    maxPageCount
  ) {
    setTitle(null);
    setAuthor(null);
    setOwner(null);
    setCity(null);
    switch (criteria) {
      case "title":
        setTitle(text);
        break;
      case "author":
        setAuthor(text);
        break;
      case "owner":
        setOwner(text);
        break;
      case "city":
        setCity(text);
        break;
    }

    setCategories(categories);
    setMinPageCount(minPageCount);
    setMaxPageCount(maxPageCount);
    setPageNumber(1);
  };

  // fetch all available books
  async function fetchAvailableBooks() {
    dispatch(setLoading({ isLoading: true, loadingMsg: "Loading books..." }));

    try {
      const response = await bookService.getBooks(
        jwt,
        pageNumber,
        title,
        author,
        owner,
        city,
        categories,
        minPageCount,
        maxPageCount
      );

      if (!response.ok) {
        throw new Error((await response.json()).message);
      }

      const data = await response.json();
      setTotalPages(data.page.totalPages);

      dispatch(setAvailableBooks({ availableBooks: data.content }));
    } catch (error) {
      dispatch(
        setInfo({ shouldShow: true, infoMsg: error.message, infoType: "error" })
      );
      navigate("/");
    } finally {
      dispatch(setLoading({ isLoading: false, loadingMsg: "" }));
    }
  }

  // fetch available books only after initial render
  useEffect(() => {
    fetchAvailableBooks();
  }, [
    pageNumber,
    title,
    author,
    owner,
    city,
    categories,
    minPageCount,
    maxPageCount,
  ]);

  console.log(availableBooks);
  return (
    <BackGround fullScreen>
      <div className="w-full p-4">
        <div className="w-full mb-10">
          <BookSearchBar setFilterState={setFilterState} />
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {availableBooks.length !== 0 ? (
            <>
              {availableBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </>
          ) : (
            <div className="text-center text-2xl col-span-3 text-white">
              No content found.
            </div>
          )}
        </div>
        {availableBooks.length !== 0 && (
          <div className="w-full mt-16">
            <PaginationIndexer
              pageNumber={pageNumber}
              totalPages={totalPages}
              setPageNumber={setPageNumber}
            />
          </div>
        )}
      </div>
    </BackGround>
  );
}

export default AllBooks;
