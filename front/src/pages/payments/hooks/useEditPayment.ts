import { useMutation } from '@tanstack/react-query'

import { api } from '@/services/api'
import { PaymentProps } from '@/types/payment'

async function editPayment(payment: Partial<PaymentProps>) {
  try {
    const response = await api.patch(`/payments/${payment.id}`, payment)

    const data = await response.data
    return data
  } catch (err) {
    console.error(err)
    return err
  }
}

export function useEditPayment() {
  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: (payment: Partial<PaymentProps>) => editPayment(payment),
  })

  return {
    editPayment: mutateAsync,
    isSuccess,
  }
}
