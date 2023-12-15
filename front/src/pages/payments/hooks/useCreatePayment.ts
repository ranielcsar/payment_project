import { useMutation } from '@tanstack/react-query'

import { api } from '@/services/api'
import { PaymentProps } from '@/types/payment'

async function createPayment(payment: Partial<PaymentProps>) {
  try {
    const response = await api.post('/payments', payment)

    const data = await response.data
    return data
  } catch (err) {
    console.error(err)
    return err
  }
}

export function useCreatePayment() {
  const { mutateAsync } = useMutation({
    mutationFn: (payment: Partial<PaymentProps>) => createPayment(payment),
  })

  return {
    createPayment: mutateAsync,
  }
}
