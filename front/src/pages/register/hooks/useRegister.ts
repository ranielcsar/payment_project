import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query'

import { api } from '@/services/api'
import { RegisterProps } from '@/types/auth'

async function register(user: RegisterProps) {
  try {
    const response = await api.post('/register', user)

    const data = await response.data
    return data
  } catch (err) {
    console.error(err)
    return err
  }
}

type Return = {
  register: UseMutateAsyncFunction<any, Error, RegisterProps, unknown>
  loading: boolean
}

export function useRegister(): Return {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (user: RegisterProps) => register(user),
  })

  return {
    register: mutateAsync,
    loading: isPending,
  }
}
