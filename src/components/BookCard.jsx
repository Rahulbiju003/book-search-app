import React from "react";

const BookCard = ({ book }) => {
  // Handle missing data gracefully
  const {
    title = "Unknown Title",
    authors = ["Unknown Author"],
    publishedDate = "N/A",
    pageCount,
    imageLinks,
    infoLink
  } = book?.volumeInfo || {};
  
  // Format date to be more readable
  const formattedDate = publishedDate 
    ? new Date(publishedDate).getFullYear() 
    : "N/A";
  
  // Safely access thumbnail and book link
  const thumbnail = imageLinks?.thumbnail || null;
  const bookLink = infoLink || "#";
  
  // Determine if we should show the page count
  const showPageCount = pageCount && pageCount > 0;
  
  // Format authors list
  const authorText = Array.isArray(authors) 
    ? authors.join(", ") 
    : authors;

  return (
    <a 
      href={bookLink} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="w-full max-w-[250px] block no-underline" 
      aria-label={`View ${title} by ${authorText}`}
    >
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg flex flex-col h-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-800 hover:border-indigo-500">
        <div className="relative w-full flex justify-center mb-4">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={`Cover of ${title}`}
              className="w-40 h-56 rounded-lg object-cover shadow-md"
              loading="lazy"
            />
          ) : (
            <div className="w-40 h-56 bg-gradient-to-b from-gray-700 to-gray-800 flex items-center justify-center text-gray-300 rounded-lg shadow-md">
              <span className="text-lg font-medium text-center px-2">{title}</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-bold mb-2 line-clamp-2 text-indigo-300">{title}</h3>
          
          <p className="text-sm text-gray-300 mb-2 line-clamp-1">
            By {authorText}
          </p>
          
          <div className="mt-auto pt-3 border-t border-gray-700">
            {showPageCount && (
              <p className="text-sm flex items-center text-gray-400 mb-1">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                </svg>
                <span>{pageCount} pages</span>
              </p>
            )}
            
            <p className="text-sm flex items-center text-gray-400">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
              <span>{formattedDate}</span>
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default BookCard;