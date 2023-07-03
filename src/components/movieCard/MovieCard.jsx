import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Rate, Tag } from 'antd'
import { format } from 'date-fns'

import Spinner from '../spinner/Spinner'
import { GenresConsumer } from '../context/genres-context'
import MovieService from '../../services/movieService'
import icon from '../../images/no_poster_available.jpg'
import './movieCard.css'

class MovieCard extends Component {
  movieService = new MovieService()

  constructor(props) {
    super(props)
    this.state = {
      imgLoading: false,
    }
  }

  onRateChange(value) {
    const { guestSessionId, updateMovieRating, movie } = this.props
    const { id } = movie
    updateMovieRating(id, value)
    this.movieService.addRating(value, id, guestSessionId)
  }

  imgLoad = () => {
    this.setState({ imgLoading: true })
  }

  render() {
    const { movie } = this.props
    const { imgLoading } = this.state
    const {
      poster_path: poster,
      title,
      release_date: releaseDate,
      overview,
      vote_average: voteAverage,
      rating,
      genre_ids: genre,
    } = movie

    const colorRate =
      voteAverage >= 7 ? '#66E900' : voteAverage >= 5 ? '#E9D100' : voteAverage >= 3 ? '#E97E00' : '#E90000'
    return (
      <GenresConsumer>
        {(genres) => {
          return (
            <div className="movie">
              {!imgLoading && <Spinner />}
              <img
                className="movie__poster"
                src={poster ? `https://image.tmdb.org/t/p/w500${poster}` : `${icon}`}
                alt={title}
                style={{ display: imgLoading ? 'block' : 'none' }}
                onLoad={this.imgLoad}
              />

              <h2 className="movie__title">{title ? title.replace(/(^.{30}([^ ]+|\s))(.*)/, '$1') : 'No title'}</h2>
              <p className="movie__date">
                {releaseDate ? format(new Date(releaseDate), 'MMMM d, yyyy') : 'No release date'}
              </p>
              <span className="movie__genres">
                {genre?.map((el) => (
                  <Tag key={el} className="movie-card__genres--genre">
                    {genres.find((gen) => gen.id === el).name}
                  </Tag>
                ))}
              </span>
              <p className="movie__overview">
                {overview ? overview.replace(/(^.{140}([^ ]+|\s))(.*)/, '$1') : 'No overview'}...
              </p>
              <Rate
                className="movie-card__user-rating"
                value={rating}
                allowHalf
                onChange={(value) => this.onRateChange(value)}
                count={10}
              />
              <div
                className="movie-card__rating"
                style={{
                  border: `2px solid ${colorRate}`,
                  height: 25,
                  borderRadius: 40,
                  textAlign: 'center',
                  paddingTop: 5,
                }}
              >
                {voteAverage.toFixed(1)}
              </div>
            </div>
          )
        }}
      </GenresConsumer>
    )
  }
}

MovieCard.defaultProps = {
  id: 0,
  overview: '',
  title: '',
  rating: 0,
}

MovieCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  rating: PropTypes.number,
  overview: PropTypes.string,
}

export default MovieCard
