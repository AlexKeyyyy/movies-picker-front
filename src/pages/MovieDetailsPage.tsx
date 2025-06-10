import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, Card, Spin, Typography, message } from 'antd'
import axios from 'axios'

interface Movie {
  movie_id: number
  title: string
  year: number
  poster_url: string
  description: string
}

export default function MovieDetailsPage() {
  const { id } = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [inWatchlist, setInWatchlist] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    axios.get(`/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(() => message.error('Не удалось загрузить фильм'))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    const checkWatchlist = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('/api/watchlist', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const ids = res.data.map((m: Movie) => m.movie_id)
        setInWatchlist(ids.includes(Number(id)))
      } catch {}
    }
    checkWatchlist()
  }, [id])

  const handleAddToWatchlist = async () => {
    if (!movie) return
    try {
      setSaving(true)
      const token = localStorage.getItem('token')
      await axios.post(
        '/api/watchlist',
        { movie_id: movie.movie_id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setInWatchlist(true)
      message.success('Фильм добавлен в список')
    } catch {
      message.error('Ошибка при добавлении')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Spin style={{ display: 'block', margin: '100px auto' }} />
  if (!movie) return null

  return (
    <Card
      title={`${movie.title} (${movie.year})`}
      cover={<img alt={movie.title} src={movie.poster_url} style={{ objectFit: 'cover', maxHeight: 500 }} />}
      style={{ maxWidth: 800, margin: '40px auto' }}
      actions={[
        !inWatchlist && <Button loading={saving} type="primary" onClick={handleAddToWatchlist}>Добавить в просмотренное</Button>
      ]}
    >
      <Typography.Paragraph>{movie.description}</Typography.Paragraph>
    </Card>
  )
}
