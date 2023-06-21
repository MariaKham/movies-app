// import React, { Component } from 'react'

import MovieCard from '../movieCard/MovieCard'
// import Spinner from '../spinner/Spinner'
// import ErrorMessage from '../errorMessage/ErrorMessage'
import './moviesList.css'

function MoviesList(props) {
  // const errorMessage = !error ? <ErrorMessage /> : null
  // const spinner = isLoading ? <Spinner /> : null
  // const hasData = !isLoading && !error
  const moviesList = props.moviesData.map((movie) => {
    return (
      <MovieCard
        key={movie.id}
        id={movie.id}
        title={movie.title}
        releaseDate={movie.release_date}
        genre={movie.genre_ids}
        voteAverage={movie.vote_average}
        poster={movie.poster_path}
        overview={movie.overview}
      />
    )
  })
  return <div className="movies">{moviesList}</div>
}

export default MoviesList
