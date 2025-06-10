import api from './client'

export interface Movie {
  movie_id: number
  title: string
  year: number
  poster_url: string
  description: string
}

export const searchMovies = (query: string) =>
  api.get<Movie[]>(`/movies/search?q=${encodeURIComponent(query)}`)

export const getMovieDetails = (id: string | undefined) =>
  api.get<Movie>(`/movies/${id}`)
