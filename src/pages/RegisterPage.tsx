import { registerUser } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Input, Button, Typography, message } from 'antd'

export default function RegisterPage() {
  const navigate = useNavigate()

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      await registerUser(values.email, values.password)
      message.success('Регистрация прошла успешно')
      navigate('/login')
    } catch {
      message.error('Ошибка регистрации')
    }
  }

  return (
    <Card title="Регистрация" style={{ maxWidth: 400, margin: '100px auto' }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Пароль" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>Зарегистрироваться</Button>
        </Form.Item>
      </Form>
      <Typography.Text>Уже есть аккаунт? <a href="/login">Войти</a></Typography.Text>
    </Card>
  )
}
