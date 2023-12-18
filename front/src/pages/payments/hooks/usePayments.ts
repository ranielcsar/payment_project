
import { useQuery } from '@tanstack/react-query'

import { api } from '@/services/api'
import { PaymentProps } from '@/types/payment'

async function getPayments() {
  try {
    const response = await api.get('/payments')

    const data = await response.data
    return data
  } catch (err) {
    console.error(err)
    return err
  }
}

export function usePayments() {
  const { isFetching, data, refetch } = useQuery({
    queryKey: ['payments'],
    queryFn: getPayments,
  })

  return {
    loading: isFetching,
    data: data as { payments: PaymentProps[] },
    refetch: refetch as any,
  }
}
