import { useEffect, useState } from 'react'
import { List, Card, Typography, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { listPopularMovies, Movie } from '../api/movies' 
import { StarOutlined } from '@ant-design/icons'

const { Title } = Typography

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchPopularMovies = async () => {
    try {
      setLoading(true)
      const res = await listPopularMovies(20)  // запрос топ-20 фильмов
      const filtered = res.data.filter(movie => movie.title.trim() !== '')
      setMovies(filtered)
    } catch {
      message.error('Ошибка загрузки популярных фильмов')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPopularMovies()
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Популярные фильмы</Title>
      <List
  grid={{ gutter: 16, column: 4 }}
  dataSource={movies}
  loading={loading}
  renderItem={movie => (
    <List.Item>
      <Card
        hoverable
        onClick={() => navigate(`/movies/${movie.movie_id}`)}
        cover={
          <img
            alt={movie.title}
            src={movie.poster_url}
            style={{ height: 300, objectFit: 'cover' }}
          />
        }
      >
        <Card.Meta
            title={`${movie.title} (${movie.year})`}
            description={
            movie.ratingKinopoisk !== undefined
        ? (
            <span>
                <StarOutlined style={{ color: '#fadb14', marginRight: 4 }} />
                {movie.ratingKinopoisk.toFixed(1)}
            </span>
            )
        : 'Рейтинг отсутствует'
             }
        />

      </Card>
    </List.Item>
  )}
/>
    </div>
  )
}
