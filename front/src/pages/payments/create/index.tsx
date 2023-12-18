import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import {
  Content,
  ContentButton,
  ContentCancelButton,
  ContentFooter,
  ContentHeader,
  ContentHeaderTitle,
  ContentMain,
} from '@/layout'

import { useCreatePayment } from '../hooks/useCreatePayment'
import { PaymentForm } from '../payment_form'
import { useNotification } from '@/utils/useNotification'

const createPaymentSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório' }),
  description: z.string({ required_error: 'Descrição é obrigatório' }),
  value: z.string({ required_error: 'Valor é obrigatório' }),
  balance: z.string({ required_error: 'Saldo é obrigatório' }),
})

type PaymentFormInputs = {
  name: string
  description: string
  value: string
  balance: string
}

export function CreatePayment() {
  const navigate = useNavigate()

  const { createPayment } = useCreatePayment()
  const { notification } = useNotification()

  const navigateBack = () => navigate('/')

  const onSubmit: SubmitHandler<PaymentFormInputs> = async (data) => {
    const value = data.value.replace(',', '.')

    const result = await createPayment({
      ...data,
      value: parseFloat(value),
      balance_to_use: data.balance,
    })

    if (!result.message) {
      return notification(result?.error, { type: 'error' })
    }

    notification(result?.message, { type: 'success' })

    navigateBack()
  }

  return (
    <Content>
      <ContentHeader>
        <ContentHeaderTitle>Criar pedido de pagamento</ContentHeaderTitle>
      </ContentHeader>

      <ContentMain>
        <PaymentForm zodSchema={createPaymentSchema} onSubmit={onSubmit} />
      </ContentMain>

      <ContentFooter>
        <ContentCancelButton onClick={navigateBack}>Cancelar</ContentCancelButton>
        <ContentButton form="payment_form" type="submit">
          Criar
        </ContentButton>
      </ContentFooter>
    </Content>
  )
}
