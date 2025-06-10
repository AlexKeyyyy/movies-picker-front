import { Layout } from 'antd'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MoviesPage from './pages/MoviesPage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import WatchlistPage from './pages/WatchlistPage'

export default function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/" element={<MoviesPage />} />
      </Routes>
    </Layout>
  )
}
