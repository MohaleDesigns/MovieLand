import {  useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './App.css';
import { MovieCard } from './MovieCard';

// API 
const API_URL = 'http://www.omdbapi.com?apikey=713aafd3'

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setsearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies();
  }, []);


  return (
    <>
      <div className="header">
        <div className="overlay"></div>
        <h1>The Movie Land</h1>

        <div className="search">
          <input
            placeholder="Search a movie"
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
          />
          <FaSearch
            className="searchIcon"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>
      </div>
      <div className="app">
        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
