import { useEffect, useState } from 'react'
import { List, Card, Rate, Typography, message } from 'antd'
import axios from 'axios'

interface RatedMovie {
  movie_id: number
  title: string
  year: number
  poster_url: string
  rating: number
}

export default function RatingsPage() {
  const [ratedMovies, setRatedMovies] = useState<RatedMovie[]>([])

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('/api/ratings', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setRatedMovies(res.data)
      } catch {
        message.error('Ошибка загрузки рейтингов')
      }
    }
    fetchRatings()
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <h2>Мои рейтинги</h2>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={ratedMovies}
        renderItem={movie => (
          <List.Item>
            <Card
              cover={<img alt={movie.title} src={movie.poster_url} style={{ height: 300, objectFit: 'cover' }} />}
              hoverable
            >
              <Card.Meta
                title={`${movie.title} (${movie.year})`}
                description={<><Rate disabled defaultValue={movie.rating} /> <Typography.Text>({movie.rating})</Typography.Text></>}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}
