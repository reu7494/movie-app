import { useState } from "react";

export default function App() {
  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [moviesData, setMoviesData] = useState([]);

  const searchMovies = async () => {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
    );
    const data = await res.json();
    setMovies(data.Search);
  };

  const movieInformation = async (imdbID) => {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`
    );
    const data = await res.json();
    setMoviesData(data.Search);
  };

  return (
    <div>
      <h2>🎬 영화 검색</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="영화 제목을 입력하세요"
      />
      <button onClick={searchMovies}>검색</button>

      <ul>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <strong>{movie.Title}</strong> ({movie.Year})<br />
            <img src={movie.Poster} alt={movie.Title} />
          </li>
        ))}
      </ul>
    </div>
  );
}
