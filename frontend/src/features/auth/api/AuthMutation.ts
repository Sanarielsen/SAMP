import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { login } from '@/auth/auth.service'

type LoginInput = {
  email: string
  password: string
}

type LoginResponse = {
  token: string
}

export function useLogin(
  options?: UseMutationOptions<LoginResponse, Error, LoginInput>
) {
  return useMutation({
    mutationFn: login,
    ...options,
  })
}