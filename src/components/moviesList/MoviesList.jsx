import React from 'react'

import MovieCard from '../movieCard/MovieCard'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import './moviesList.css'

function MoviesList({
  moviesData,
  loading,
  error,
  totalResults,
  guestSessionId,
  ratedMovies,
  rated,
  genres,
  updateMovieRating,
}) {
  const data = !(loading && error)

  return (
    <div className="movies">
      {error ? <ErrorMessage description="Some problems, please try again later" /> : null}
      {loading ? <Spinner /> : null}
      {data && !rated ? (
        <MoviesView
          moviesData={moviesData}
          guestSessionId={guestSessionId}
          updateMovieRating={updateMovieRating}
          genres={genres}
        />
      ) : null}
      {rated ? <MoviesView moviesData={ratedMovies} guestSessionId={guestSessionId} genres={genres} /> : null}
      {!loading && !totalResults ? <ErrorMessage description="Nothing found" /> : null}
    </div>
  )
}

function MoviesView({ moviesData, guestSessionId, updateMovieRating }) {
  return (
    <>
      {moviesData.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            guestSessionId={guestSessionId}
            updateMovieRating={updateMovieRating}
          />
        )
      })}
    </>
  )
}

export default MoviesList
