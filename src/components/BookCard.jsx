function BookCard({ book }) {
  return (
    <div className="w-fit grid grid-cols-3 gap-1 bg-gradient-to-br from-black via-gray-800 to-white text-white p-4 rounded-lg shadow-xl shadow-violet-500/50 transition-transform transform hover:scale-105">
      <div className="col-span-1 flex justify-center items-center">
        <img
          src={book.coverPhotoURL}
          alt="Cover Photo"
          className="shadow-2xl shadow-black"
        />
      </div>
      <div className="col-span-2 bg-gray-900 bg-opacity-75 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-white">{book.bookTitle}</h2>
        <p className="text-gray-300">Author: {book.bookAuthor}</p>
        <p className="text-gray-300">Category: {book.bookCategoryName}</p>
        <p className="text-gray-300">Pages: {book.bookPageCount}</p>
        <p className="text-gray-300 mt-8">
          Uploaded on : {book.bookUploadDate}
        </p>
      </div>
    </div>
  );
}

export default BookCard;
