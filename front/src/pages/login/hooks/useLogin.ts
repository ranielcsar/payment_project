import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query'

import { api } from '@/services/api'
import { LoginProps } from '@/types/auth'

async function login(user: LoginProps) {
  try {
    const response = await api.post('/login', user)

    const data = await response.data
    return data
  } catch (err) {
    console.error(err)
    return err
  }
}

type Return = {
  login: UseMutateAsyncFunction<any, Error, LoginProps, unknown>
  loading: boolean
}

export function useLogin(): Return {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (user: LoginProps) => login(user),
  })

  return {
    login: mutateAsync,
    loading: isPending,
  }
}
