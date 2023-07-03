class MovieService {
  API_BASE = 'https://api.themoviedb.org/3'

  API_KEY = '9076373ed6d39aaf14437fbf967d1ed2'

  getResource = async (url) => {
    try {
      const response = await fetch(`${this.API_BASE}${url}`)

      if (!response.ok) {
        throw new Error(`Ошибка запроса ${url}`, +`код ${response.status}`)
      }

      return response.json()
    } catch (e) {
      console.log(e.message)
    }
  }

  // массив фильмов
  async getMovies(search = 'spider', page = 1) {
    return this.getResource(
      `/search/movie?api_key=${this.API_KEY}&language=en-US&query=${search}&page=${page}&include_adult=false`
    )
  }

  // getTrendingMovies() {
  //   return this.getResource(`/trending/all/week?api_key=${this.API_KEY}`)
  // }

  // жанры
  getGenres() {
    return this.getResource(`/genre/movie/list?api_key=${this.API_KEY}&language=en-US`)
  }

  // гостевая сессия
  createGuestSession() {
    return this.getResource(`/authentication/guest_session/new?api_key=${this.API_KEY}`)
  }

  async addRating(value, movieId, guestSessionId) {
    try {
      const response = await fetch(
        `${this.API_BASE}/movie/${movieId}/rating?api_key=${this.API_KEY}&guest_session_id=${guestSessionId}`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({ value }),
        }
      )

      if (!response.ok) {
        throw new Error(`Ошибка при добавлении рейтинга ${response.status}`)
      }
      return response.json()
    } catch (e) {
      console.log(e.message)
    }
  }

  getRatedMovies(guestSessionId) {
    return this.getResource(
      `/guest_session/${guestSessionId}/rated/movies?api_key=${this.API_KEY}&sort_by=created_at.asc`
    )
  }
}

export default MovieService
