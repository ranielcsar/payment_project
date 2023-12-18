import { SubmitHandler } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
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
import { PaymentProps } from '@/types/payment'

import { useEditPayment } from '../hooks/useEditPayment'
import { PaymentForm } from '../payment_form'
import { useNotification } from '@/utils/useNotification'

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
  const { notification } = useNotification()

  const resetStateAndNavigateBack = () => navigate('/', { state: null })

  const onSubmit: SubmitHandler<PaymentFormInputs> = async (data) => {
    const result = await editPayment({
      ...payment,
      ...data,
    })

    if (!result.message) {
      return notification(result?.error, { type: 'error' })
    }

    notification(result?.message, { type: 'success' })

    resetStateAndNavigateBack()
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
        <ContentCancelButton onClick={resetStateAndNavigateBack}>
          Cancelar
        </ContentCancelButton>
        <ContentButton form="payment_form" type="submit">
          Salvar
        </ContentButton>
      </ContentFooter>
    </Content>
  )
}
