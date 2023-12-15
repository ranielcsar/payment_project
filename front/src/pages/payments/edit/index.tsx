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
import { useLocation, useNavigate } from 'react-router-dom'
import { PaymentProps } from '@/types/payment'
import { useEditPayment } from '../hooks/useEditPayment'

const editPaymentSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório' }),
})

type PaymentFormInputs = {
  name: string
}

type State = {
  payment: PaymentProps
}

export function EditPayment() {
  const location = useLocation()
  const navigate = useNavigate()
  const { payment } = location.state as State

  const { editPayment } = useEditPayment()

  const resetStateAndBack = () => navigate('/', { state: null })

  const onSubmit: SubmitHandler<PaymentFormInputs> = (data) => {
    editPayment({
      ...payment,
      ...data,
    }).then(resetStateAndBack)
  }

  return (
    <Content>
      <ContentHeader>
        <ContentHeaderTitle>Editar pedido de pagamento</ContentHeaderTitle>
      </ContentHeader>

      <ContentMain>
        <PaymentForm
          defaultValues={payment}
          zodSchema={editPaymentSchema}
          onSubmit={onSubmit}
        />
      </ContentMain>

      <ContentFooter>
        <ContentCancelButton onClick={resetStateAndBack}>Cancelar</ContentCancelButton>
        <ContentButton form="payment_form" type="submit">
          Salvar
        </ContentButton>
      </ContentFooter>
    </Content>
  )
}
