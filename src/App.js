import { useState } from "react";

export default function App() {
  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (query) => {
    const movieID = query.movie.imdbID;
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieID}`
    );
    const data = await res.json();
    setMovies(data.Search || []);
    console.log(data);
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
      <button
        onClick={(e) => {
          searchMovies(query);
        }}
      >
        검색
      </button>

      <ul>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <strong>{movie.Title}</strong> ({movie.Year},{movie.imdbRating})
            <br />
            <img src={movie.Poster} alt={movie.Title} />
          </li>
        ))}
      </ul>
    </div>
  );
}
