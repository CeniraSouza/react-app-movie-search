// useState hook to manage State in a function component

import React, { useState } from 'react';
// import ReactDOM from 'react-dom';

import MovieCard from './movieCard.js';

export default function SearchMovies() {
  //states - for user input query and the movies that will be displayed
  // in this case we'll give a name to the first and second value of the array later

  const [query, setQuery] = useState('');
  //create the state for movies, and update that state appropriately
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    //async prevent it from submitting the default action of submitting
    e.preventDefault();
    // console.log('submitting');

    const query = 'Jurassic Park';

    const url = `https://api.themoviedb.org/3/search/movie?api_key=1fca1c9fa6b984d38fec5440189d7aca&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">Movie Name</label>
        <input className="input" type="text" name="query" placeholder="i.e. Jurassic Park"
          value={query} onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit" disabled={!query}>Search</button>
      </form>
      <div className="card-list">
        {movies.filter((movie) => movie.poster_path).map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </>
  );
}
