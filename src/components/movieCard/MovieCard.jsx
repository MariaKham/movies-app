import React from 'react'
import PropTypes from 'prop-types'
// import { Rate } from 'antd'

import icon from '../../images/no_poster_available.jpg'
// const POSTER_HEIGHT = 280
// const POSTER_WIDTH = 185

// const STARS_COUNT = 10
// const DIGITS_AFTER_COMMA = 1

const scoreColor = {
  BAD: '#FF0000',
  AVERAGE: '#FF6347',
  GOOD: '#E9D100',
  GREAT: '#00FF00',
}

const getScoreColor = (voteAverage) => {
  if (voteAverage < 3) {
    return scoreColor.BAD
  }
  if (voteAverage >= 3 && voteAverage < 5) {
    return scoreColor.AVERAGE
  }
  if (voteAverage >= 5 && voteAverage < 7) {
    return scoreColor.GOOD
  }
  return scoreColor.GREAT
}

function MovieCard({ title, releaseDate, genre, voteAverage, overview }) {
  return (
    <div className="movie">
      <img className="movie__poster" src={icon} alt={title} title={title} width={280} height={185} />

      <h2 className="movie__title">{title}</h2>
      <p className="movie__date">{releaseDate}</p>
      <ul className="movie__genres">
        {genre.map((id, el) => {
          return (
            <li key={id} className="el-genre">
              {el}
            </li>
          )
        })}
      </ul>
      <p className="movie__overview">{overview.replace(/(^.{140}([^ ]+|\s))(.*)/, '$1')}...</p>
      <div className={`movie__vote-average movie__vote-average--${getScoreColor(voteAverage)}`}>
        {voteAverage.toFixed(1)}
      </div>
    </div>
  )
}

MovieCard.propTypes = {
  // id: PropTypes.number.isRequired,
  // title: PropTypes.string.isRequired,
  // releaseDate: PropTypes.instanceOf(Date).isRequired,
  genre: PropTypes.arrayOf(PropTypes.number).isRequired,
  voteAverage: PropTypes.number.isRequired,
  // poster: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
}

export default MovieCard
