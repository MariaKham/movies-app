import { createRoot } from 'react-dom/client'

import App from './components/app/App'

const container = document.getElementById('root')
const root = createRoot(container) // createRoot(container!) if you use TypeScript

// const movieService = new MovieService()
// movieService.getMovies().then((res) => console.log(res))
// movieService.getGenres().then((res) => console.log(res))

root.render(<App />)
