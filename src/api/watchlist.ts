import api from './client'
import { Movie } from './movies'

export const getWatchlist = () => api.get<Movie[]>('/watchlist')

export const addToWatchlist = (movieId: number) =>
  api.post('/watchlist', { movie_id: movieId })

export const removeFromWatchlist = (movieId: number) =>
  api.delete(`/watchlist/${movieId}`)
