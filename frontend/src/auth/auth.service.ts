import { api } from '@/api/axios'

type LoginDTO = {
  email: string
  password: string
}

export async function login({ email, password }: LoginDTO) {
  const { data } = await api.post('/session', {
    email,
    password,
  })

  localStorage.setItem('token', data.token)

  return data
}

export function logout() {
  localStorage.removeItem('token')
}