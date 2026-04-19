import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!query) {
      setBooks([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}`,
        );
        setBooks(response.data.items);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="App">
      <h1>Find a Book</h1>

      <div className="search-wrapper">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ค้นหาหนังสือ..."
        />
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Fetching Error...</p>}

      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.volumeInfo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
