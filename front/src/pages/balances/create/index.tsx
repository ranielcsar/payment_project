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

import { BalanceForm } from '../balance_form'
import { useCreateBalance } from '../hooks/useCreateBalance'
import { useNotification } from '@/utils/useNotification'

const createBalanceSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório' }),
  description: z.string({ required_error: 'Descrição é obrigatória' }),
  initial_value: z.string({ required_error: 'Valor é obrigatório' }),
})

type BalanceFormInputs = {
  name: string
  description: string
  initial_value: string
}

export function CreateBalance() {
  const navigate = useNavigate()
  const { createBalance } = useCreateBalance()
  const { notification } = useNotification()

  const navigateBack = () => navigate('/balances')

  const onSubmit: SubmitHandler<BalanceFormInputs> = async (data) => {
    const initial_value = data.initial_value.replace(',', '.')

    const result = await createBalance({
      ...data,
      initial_value: parseFloat(initial_value),
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
        <ContentHeaderTitle>Criar saldo</ContentHeaderTitle>
      </ContentHeader>

      <ContentMain>
        <BalanceForm zodSchema={createBalanceSchema} onSubmit={onSubmit} />
      </ContentMain>

      <ContentFooter>
        <ContentCancelButton onClick={navigateBack}>Cancelar</ContentCancelButton>
        <ContentButton form="balance_form" type="submit">
          Criar
        </ContentButton>
      </ContentFooter>
    </Content>
  )
}
