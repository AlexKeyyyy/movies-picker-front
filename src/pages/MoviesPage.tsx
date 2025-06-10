import { useEffect, useState } from 'react'
import { Input, List, Card, Typography, message } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const { Search } = Input

interface Movie {
  movie_id: number
  title: string
  year: number
  poster_url: string
  description: string
}

export default function MoviesPage() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchMovies = async (q: string) => {
    if (!q.trim()) return
    try {
      setLoading(true)
      const res = await axios.get(`/api/movies/search?q=${encodeURIComponent(q)}`)
      setMovies(res.data)
    } catch {
      message.error('Ошибка загрузки фильмов')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies('batman')
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <Search
        placeholder="Поиск фильмов"
        enterButton="Поиск"
        size="large"
        onSearch={fetchMovies}
        loading={loading}
        style={{ marginBottom: 24 }}
      />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={movies}
        loading={loading}
        renderItem={movie => (
          <List.Item>
            <Card
              hoverable
              onClick={() => navigate(`/movies/${movie.movie_id}`)}
              cover={<img alt={movie.title} src={movie.poster_url} style={{ height: 300, objectFit: 'cover' }} />}
            >
              <Card.Meta title={`${movie.title} (${movie.year})`} description={movie.description} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}