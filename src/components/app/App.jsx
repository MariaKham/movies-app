import React, { Component } from 'react'
// import { Offline, Online } from 'react-detect-offline'
import { Pagination, Tabs } from 'antd'
import { debounce } from 'lodash'

import { GenresProvider } from '../context/genres-context'
import MovieService from '../../services/movieService'
import MoviesList from '../moviesList/MoviesList'
import SearchForm from '../searchForm/SearchForm'
// import ErrorMessage from '../errorMessage/ErrorMessage'

import '../../style.css'

class App extends Component {
  movieService = new MovieService()

  constructor(props) {
    super(props)

    this.state = {
      moviesData: [],
      loading: true,
      error: false,
      totalResults: 0,
      currentPage: 1,
      genres: [],
      search: 'spider',
      guestSessionId: '',
      ratedMovies: [],
      rated: false,
    }
  }

  componentDidMount() {
    this.movieService.createGuestSession().then(this.updateSession).catch(this.onError)
    this.movieService.getGenres().then(this.updateGenres).catch(this.onError)
    this.movieService.getMovies().then(this.updateMoviesList).catch(this.onError)
  }

  componentDidUpdate(prevProps, prevState) {
    const { search, currentPage } = this.state
    if (prevState.search !== search || prevState.currentPage !== currentPage) {
      this.movieService.getMovies(search, currentPage).then(this.updateMoviesList).catch(this.onError)
    }
  }

  handleSearch = debounce((e) => {
    this.setState({ search: e.target.value, loading: true, moviesData: [] })
  }, 1500)

  onError = () => {
    this.setState({ loading: false, error: true, moviesData: [] })
  }

  updateMoviesList = (res) => {
    this.setState({
      moviesData: res.results,
      totalResults: res.total_results,
      loading: false,
      error: false,
    })
  }

  updateGenres = (res) => {
    this.setState({ genres: res.genres })
  }

  updateSession = (res) => {
    this.setState({
      guestSessionId: res.guest_session_id,
      loading: false,
    })
  }

  updateMovieRating = (movieId, ratingValue) => {
    this.setState(({ moviesData }) => {
      const idx = moviesData.findIndex((el) => el.id === movieId)
      const oldItem = moviesData[idx]
      const newItem = { ...oldItem, rating: ratingValue }

      return { moviesData: [...moviesData.slice(0, idx), newItem, ...moviesData.slice(idx + 1)] }
    })
  }

  updateRatedMovies = () => {
    const { guestSessionId } = this.state
    this.movieService
      .getRatedMovies(guestSessionId)
      .then((res) => {
        this.setState({ ratedMovies: res.results })
      })
      .catch(this.onError)
  }

  switchTabs = () => {
    const { rated } = this.state
    this.updateRatedMovies()
    this.setState({ rated: !rated })
  }

  onPaginationChange = (page) => {
    this.setState({ currentPage: page })
  }

  render() {
    const { loading, error, moviesData, totalResults, ratedMovies, genres, currentPage, guestSessionId, rated } =
      this.state

    const mainContent = (
      <div className="content-wrapper">
        <div className="page-content">
          {!rated ? <SearchForm handleSearch={this.handleSearch} /> : null}
          <MoviesList
            moviesData={moviesData}
            totalResults={totalResults}
            loading={loading}
            error={error}
            guestSessionId={guestSessionId}
            ratedMovies={ratedMovies}
            updateMovieRating={this.updateMovieRating}
            rated={rated}
          />
        </div>
        <div className="pagination">
          {totalResults && !rated ? (
            <Pagination
              className={`pagination ${moviesData.length ? '' : 'js-hidden'}`}
              showSizeChanger={false}
              defaultPageSize={20}
              currentPage={currentPage}
              current={currentPage}
              total={totalResults}
              rated={rated}
              ratedMovies={ratedMovies}
              onChange={this.onPaginationChange}
            />
          ) : null}
        </div>
      </div>
    )

    return (
      <div className="content-wrapper">
        <GenresProvider value={genres}>
          {/* <Offline>
            <ErrorMessage description="Oops...You are offline. Please, check your internet connection" />
          </Offline> */}
          {/* <Online> */}
          <Tabs
            centered
            defaultActiveKey="1"
            onChange={this.switchTabs}
            items={[
              {
                label: 'Search',
                key: '1',
                children: mainContent,
              },
              {
                label: 'Rated',
                key: '2',
                children: mainContent,
              },
            ]}
          />
          {/* </Online> */}
        </GenresProvider>
      </div>
    )
  }
}

export default App
