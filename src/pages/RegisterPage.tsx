import { Button, Card, Form, Input, Typography, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function RegisterPage() {
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    try {
      await axios.post('/api/register', values)
      message.success('Регистрация прошла успешно')
      navigate('/login')
    } catch {
      message.error('Ошибка регистрации')
    }
  }

  return (
    <Card title="Регистрация" style={{ maxWidth: 400, margin: '100px auto' }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}> <Input /> </Form.Item>
        <Form.Item name="password" label="Пароль" rules={[{ required: true }]}> <Input.Password /> </Form.Item>
        <Form.Item> <Button type="primary" htmlType="submit" block>Зарегистрироваться</Button> </Form.Item>
      </Form>
      <Typography.Text>Уже есть аккаунт? <a href="/login">Войти</a></Typography.Text>
    </Card>
  )
}