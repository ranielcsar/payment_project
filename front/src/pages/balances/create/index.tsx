import {
  Content,
  ContentHeader,
  ContentHeaderTitle,
  ContentMain,
  ContentFooter,
  ContentButton,
  ContentCancelButton,
} from '@/layout'
import { SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { BalanceForm } from '../balance_form'
import { useCreateBalance } from '../hooks/useCreateBalance'

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

  const goBack = () => navigate('/balances')

  const onSubmit: SubmitHandler<BalanceFormInputs> = (data) => {
    const initial_value = data.initial_value.replace(',', '.')

    createBalance({
      ...data,
      initial_value: parseFloat(initial_value),
    }).then(goBack)
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
        <ContentCancelButton onClick={goBack}>Cancelar</ContentCancelButton>
        <ContentButton form="balance_form" type="submit">
          Criar
        </ContentButton>
      </ContentFooter>
    </Content>
  )
}
