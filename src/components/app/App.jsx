import React, { Component } from 'react'
// import { Offline, Online } from 'react-detect-offline'

import MovieService from '../../services/movieService'
import MoviesList from '../moviesList/MoviesList'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import '../../style.css'

// const API_KEY = '9076373ed6d39aaf14437fbf967d1ed2'
// const POSTER_URL = 'https://image.tmdb.org/t/p/w500'

class App extends Component {
  movieService = new MovieService()

  constructor(props) {
    super(props)

    this.state = {
      moviesData: [],
      isLoading: true,
      error: false,
    }
  }

  componentDidMount() {
    this.showMovies()
  }

  showMovies() {
    this.movieService.getMovies().then(
      (res) => {
        this.setState({
          isLoading: false,
          moviesData: [...res.results],
        })
      },
      (error) => {
        this.setState({
          isLoading: false,
          error,
        })
      }
    )
  }
  // componentDidMount() {
  //   fetch('https://api.themoviedb.org/3/trending/all/week?api_key=9076373ed6d39aaf14437fbf967d1ed2')
  //     .then((data) => data.json())
  //     .then(
  //       (data) => {
  //         this.setState({
  //           isLoaded: true,
  //           moviesData: [...data.results],
  //         })
  //       },
  //       // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
  //       // чтобы не перехватывать исключения из ошибок в самих компонентах.
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error,
  //         })
  //       }
  //     )
  // }

  render() {
    const { isLoading, error, moviesData } = this.state
    if (error) {
      return <ErrorMessage />
    }
    if (isLoading) {
      return <Spinner />
    }
    return (
      <div className="content-wrapper">
        {/* <Online> */}
        <div className="page-content">
          <MoviesList moviesData={moviesData} />
        </div>
        {/* </Online> */}
        {/* <Offline>
          <p className="internet-error">Oops...You are offline. Please check your internet connection or use VPN</p>
        </Offline> */}
      </div>
    )
  }
}

export default App
