import { BalanceProps } from '@/types/balance'

import { useQuery } from '@tanstack/react-query'

import { api } from '@/services/api'

async function getBalances() {
  try {
    const response = await api.get('/balances')

    const data = await response.data
    return data
  } catch (err) {
    console.error(err)
    return err
  }
}

export function useBalances() {
  const { isFetching, data, refetch } = useQuery({
    queryKey: ['balances'],
    queryFn: getBalances,
  })

  return {
    loading: isFetching,
    data: data as { balances: BalanceProps[] },
    refetch: refetch as any,
  }
}
