import { Menu, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  HomeOutlined,
  StarOutlined,
  LoginOutlined,
  UserAddOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from '@ant-design/icons'

export default function Navbar() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    message.success('Вы вышли из системы')
    navigate('/')
  }

  const guestItems = [
    { key: '/', icon: <HomeOutlined />, label: 'Главная' },
    { key: '/login', icon: <LoginOutlined />, label: 'Войти' },
    { key: '/register', icon: <UserAddOutlined />, label: 'Регистрация' },
  ]

  const userItems = [
    { key: '/', icon: <HomeOutlined />, label: 'Главная' },
    { key: '/watchlist', icon: <VideoCameraOutlined />, label: 'К просмотру' },
    { key: '/ratings', icon: <StarOutlined />, label: 'Мои оценки' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Выйти' },
  ]

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      onClick={({ key }) => {
        if (key === 'logout') {
          handleLogout()
        } else {
          navigate(key)
        }
      }}
      selectable={false}
      style={{ display: 'flex', justifyContent: 'center' }}
      items={isLoggedIn ? userItems : guestItems}
    />
  )
}
