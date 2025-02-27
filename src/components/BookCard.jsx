import React from "react";

const BookCard = ({ book }) => {
  const bookLink = book.volumeInfo.infoLink || "#";

  return (
    <a href={bookLink} target="_blank" rel="noopener noreferrer" className="w-full max-w-[250px]">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg flex flex-col items-center cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl">
        {book.volumeInfo.imageLinks?.thumbnail ? (
          <img
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title}
            className="w-40 h-56 rounded-lg object-cover mb-4"
          />
        ) : (
          <div className="w-40 h-56 bg-gray-700 flex items-center justify-center text-white rounded-lg">
            No Image
          </div>
        )}
        <h3 className="text-lg font-bold text-center truncate w-full">{book.volumeInfo.title}</h3>
        <p className="text-sm flex items-center">
          📖 Page Count: <span className="ml-1 font-medium">{book.volumeInfo.pageCount}</span>
        </p>
        <p className="text-sm flex items-center">
          📅 Published: <span className="ml-1 font-medium">{book.volumeInfo.publishedDate}</span>
        </p>
      </div>
    </a>
  );
};

export default BookCard;