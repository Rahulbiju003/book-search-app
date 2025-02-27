import Search from "./components/search";
import { useState, useEffect } from "react";
import Spinner from "./components/Spinner";
import BookCard from "./components/BookCard";
import Footer from "./components/Footer";

const API_BASE_URL = "https://www.googleapis.com/books/v1/";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async (query) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}volumes?q=${query}&printType=books&orderBy=relevance&maxResults=10&key=${API_KEY}`
      );
      const data = await response.json();
      if (data.error) {
        setBooks([]);
        throw new Error(data.error.message);
      }
      setBooks(data.items || []);
    } catch (error) {
      console.error(`Error fetching the books: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks("top books");
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchBooks(searchTerm);
      } else {
        fetchBooks("top books");
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="Wrapper">
        <header>
          <img className="w-32 h-32" src="public/logo.svg" alt="Logo" />
          <h1>
            Find <span className="text-gradient">Books</span> That You&apos;ll
            Enjoy
          </h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <section className="all-books">
          <h2 className="max-w-screen-xl mx-auto px-6 md:px-12 mt-[40px]">
            {searchTerm ? `Results for "${searchTerm}"` : "Top 10 Books:"}
          </h2>
          <div className="books">
            {isLoading ? (
              <Spinner />
            ) : (
              <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                <div className="mt-[20px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {books.length > 0 ? (
                    books.map((book) => <BookCard key={book.id} book={book} />)
                  ) : (
                    <p className="text-center col-span-full">
                      No books found. Try a different search!
                    </p>
                  )}
                </div>
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