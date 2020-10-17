import React, { useState } from "react";
import "./Form.css";
import ClipLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/core";


export default function SearchMovies() {

    const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [Loading, setLoading] = useState(false);
  const searchMovies = async (e) => {
    setLoading(true);
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=d9b351fd8b7004446e3037079719bd7e&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Movie name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e. Mr Robot"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          {" "}
          Search{" "}
        </button>
      </form>
      {Loading ? (
          <div className="sweet-loading">
          <ClipLoader
            css={override}
            size={25}
            color={"black"}
            loading={Loading}
          />
        </div>
      ) : (
        <p></p>
      )}
      <div className="card-list">
        {movies.map((movie) => (
          <div className="card" key={movie.id}>
            <img
              className="card--image"
              src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
              alt={movie.title + " poster"}
            />
            <div className="card--content">
              <h3 className="card--title">{movie.title}</h3>
              <p>
                <small>RELEASE DATE: {movie.release_date}</small>
              </p>
              <p>
                <small>RATING: {movie.vote_average}</small>
              </p>
              <p className="card--desc">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
