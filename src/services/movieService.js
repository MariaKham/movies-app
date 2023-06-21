// class MovieService {
//     _apiBase = 'https://swapi.dev/api';

//     async fetchMovies(url)
//     {
//       // остаток юрл будет при запросе, если не надо - исправить
//       const response = await fetch(`${this._apiBase}${url}`);

//       if(!response.ok) {
//         throw new Error(`Could not fetch ${url}`, + `received ${response.status}`)
//       }

//       return await response.json();
//     };

//     async getAllMovies() {
//       const response = await this.fetchMovies(`/people/`)
//       return response.results;
//       // вернули массив персонажей
//     };

//     getMovie(id) {
//       return this.fetchMovies(`/people/${id}`)
//     };
//     // вернули один фильм
//   }

//   // вызываем и проверяем работы прописанных функций
//   const movieDB = new MovieService();

//   movieDB.getMovie(3).then((p) => {
//     console.log(p.name)
//   })

//   // fetchMovies('https://swapi.dev/api/people/1888888/')
//   // .then((body) => {
//   //   console.log(body);
//   // })
//   // .catch((error) => {
//   //   console.error('could not fetch', error);
//   // });

//   export default MovieService

// class MovieService {
//   apiBase = 'https://api.themoviedb.org/3'

//   // searchMovie ='/search/movie';
//   apiKey = '9076373ed6d39aaf14437fbf967d1ed2'

//   async fetchMovies(url) {
//     // остаток юрл будет при запросе, если не надо - исправить
//     const response = await fetch(`${this.apiBase}${url}?api_key=${this.apiKey}`)

//     if (!response.ok) {
//       throw new Error(`Could not fetch ${url}`, +`received ${response.status}`)
//     }

//     return response.json()
//   }

//   async getAllMovies() {
//     const response = await this.fetchMovies('/trending/all/week')
//     return response.results
//     // вернули массив фильмов
//   }

//   // getMovie(id) {
//   //   return this.fetchMovies(`/people/${id}`)
//   // };
//   // вернули один фильм
// }

// вызываем и проверяем работы прописанных функций
// const movieDB = new MovieService()

// movieDB.getAllMovies().then((body) => {
//   console.log(body)
// })

class MovieService {
  API_BASE = 'https://api.themoviedb.org/3'

  API_KEY = '9076373ed6d39aaf14437fbf967d1ed2'

  getResource = async (url) => {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}`, +`received ${response.status}`)
    }

    return response.json()
  }

  getMovies = async () => {
    const response = await this.getResource(`${this.API_BASE}/trending/all/week?api_key=${this.API_KEY}`)
    // вернули массив фильмов
    return response
  }

  getGenres = () => {
    return this.getResource(`${this.API_BASE}/genre/movie/list?api_key=${this.API_KEY}&language=en-US`)
  }

  // transformMovies = (res) => {
  //   return {
  //     id: res.id,
  //     title: res.title,
  //     releaseDate: res.release_date,
  //     genre: res.genre_ids,
  //     voteAverage: res.vote_average,
  //     poster: res.poster_path,
  //     overview: res.overview,
  //   }
  // }
}

export default MovieService
