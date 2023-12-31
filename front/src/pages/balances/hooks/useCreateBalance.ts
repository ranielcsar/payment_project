import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query'

import { api } from '@/services/api'
import { BalanceProps } from '@/types/balance'

async function createBalance(balance: Partial<BalanceProps>) {
  try {
    const response = await api.post('/balances', balance)

    const data = await response.data
    return data
  } catch (err) {
    console.error(err)
    return err
  }
}

type Return = {
  createBalance: UseMutateAsyncFunction<any, Error, Partial<BalanceProps>, unknown>
}

export function useCreateBalance(): Return {
  const { mutateAsync } = useMutation({
    mutationFn: (balance: Partial<BalanceProps>) => createBalance(balance),
  })

  return {
    createBalance: mutateAsync,
  }
}
