import { useMutation } from '@tanstack/react-query'

import { api } from '@/services/api'
import { BalanceProps } from '@/types/balance'

async function editBalance(balance: Partial<BalanceProps>) {
  try {
    const response = await api.patch(`/balances/${balance.id}`, balance)

    const data = await response.data
    return data
  } catch (err) {
    console.error(err)
    return err
  }
}

export function useEditBalance() {
  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: (balance: Partial<BalanceProps>) => editBalance(balance),
  })

  return {
    editBalance: mutateAsync,
    isSuccess,
  }
}
