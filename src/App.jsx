import { useState, useEffect, useCallback } from "react";
import Search from "./components/search";
import Spinner from "./components/Spinner";
import BookCard from "./components/BookCard";
import Footer from "./components/Footer";

const API_BASE_URL = "https://www.googleapis.com/books/v1/";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const DEFAULT_SEARCH = "top books";
const DEBOUNCE_DELAY = 500;
const MAX_RESULTS = 12;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  // Memoize fetchBooks to avoid recreating on every render
  const fetchBooks = useCallback(async (query) => {
    if (!query.trim()) {
      query = DEFAULT_SEARCH;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}volumes?q=${encodeURIComponent(query)}&printType=books&orderBy=relevance&maxResults=${MAX_RESULTS}&key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }
      
      setBooks(data.items || []);
      setTotalResults(data.totalItems || 0);
    } catch (error) {
      console.error(`Error fetching books:`, error);
      setError(error.message);
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchBooks(DEFAULT_SEARCH);
  }, [fetchBooks]);

  // Handle search with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchBooks(searchTerm);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, fetchBooks]);

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchBooks(searchTerm);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="pattern absolute inset-0 opacity-10 pointer-events-none z-0" />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-12">
        <header className="py-10 text-center">
          <div className="flex justify-center mb-4">
            <img 
              className="w-24 h-24 md:w-32 md:h-32" 
              src="/logo.svg" 
              alt="Book Finder Logo" 
            />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Find <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Books</span> That You&apos;ll Enjoy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Search millions of books to discover your next great read
          </p>
        </header>

        <Search 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          onSubmit={handleSearchSubmit}
        />
        
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold">
              {searchTerm ? `Results for "${searchTerm}"` : "Recommended Books"}
            </h2>
            {totalResults > 0 && !isLoading && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {totalResults} books found
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          <div className="min-h-[300px]">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {books.length > 0 ? (
                  books.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                      No books found for your search.
                    </p>
                    <button 
                      onClick={() => fetchBooks(DEFAULT_SEARCH)} 
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      Show recommended books
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
};

export default App;