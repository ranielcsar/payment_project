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

const createPaymentSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório' }),
  description: z.string({ required_error: 'Descrição é obrigatório' }),
  value: z.string({ required_error: 'Valor é obrigatório' }),
  balance: z.number({ required_error: 'Saldo é obrigatório' }),
})

type PaymentFormInputs = {
  name: string
  description: string
  value: number
  balance: string
}

export function CreatePayment() {
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<PaymentFormInputs> = (data) => console.log(data)

  return (
    <Content>
      <ContentHeader>
        <ContentHeaderTitle>Criar pedido de pagamento</ContentHeaderTitle>
      </ContentHeader>

      <ContentMain>
        <PaymentForm zodSchema={createPaymentSchema} onSubmit={onSubmit} />
      </ContentMain>

      <ContentFooter>
        <ContentCancelButton onClick={() => navigate('/')}>Cancelar</ContentCancelButton>
        <ContentButton form="payment_form" type="submit">
          Criar
        </ContentButton>
      </ContentFooter>
    </Content>
  )
}
