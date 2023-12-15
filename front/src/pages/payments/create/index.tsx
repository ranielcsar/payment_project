import {
  Content,
  ContentHeader,
  ContentHeaderTitle,
  ContentMain,
  ContentFooter,
  ContentButton,
  ContentCancelButton,
} from '@/layout'
import { PaymentForm } from '../payment_form'
import { SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useCreatePayment } from '../hooks/useCreatePayment'

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

  const navigateBack = () => navigate('/')

  const onSubmit: SubmitHandler<PaymentFormInputs> = (data) => {
    const value = data.value.replace(',', '.')

    createPayment({
      ...data,
      value: parseFloat(value),
      balance_to_use: data.balance,
    }).then(navigateBack)
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
