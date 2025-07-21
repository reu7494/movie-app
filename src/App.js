import { useState } from "react";

export default function App() {
  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [moviesData, setMoviesData] = useState({});

  const searchMovies = async () => {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
    );
    const data = await res.json();
    setMovies(data.Search);
  };

  const movieInformation = async (movieID) => {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieID}`
    );
    const data = await res.json();
    setMoviesData((prev) => ({
      ...prev,
      [movieID]: data.imdbRating,
    }));
  };

  return (
    <div>
      <h2>🎬 영화 검색</h2>
      <input
        type="text"
        pattern="[A-Za-z]+"
        value={query}
        onChange={(e) => {
          const value = e.target.value; //사용자 입력
          const filtered = value.replace(/[^a-zA-Z0-9]/g, ""); // 영어, 숫자 외 문자 제거
          setQuery(filtered); // 상태 업데이트
        }}
        placeholder="영화 제목을 영어로 입력하세요"
      />
      <button onClick={searchMovies}>검색</button>

      <ul>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <strong>{movie.Title}</strong> ({movie.Year})
            <button
              onClick={() => {
                movieInformation(movie.imdbID);
              }}
            >
              상세보기
            </button>
            <strong>평점: {moviesData[movie.imdbID]}</strong>
            <br />
            <img src={movie.Poster} alt={movie.Title} />
          </li>
        ))}
      </ul>
    </div>
  );
}
