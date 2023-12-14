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

const createBalanceSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório' }),
  value: z.string({ required_error: 'Valor é obrigatório' }),
})

type BalanceFormInputs = {
  name: string
  value: number
}

export function CreateBalance() {
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<BalanceFormInputs> = (data) => console.log(data)

  return (
    <Content>
      <ContentHeader>
        <ContentHeaderTitle>Criar saldo</ContentHeaderTitle>
      </ContentHeader>

      <ContentMain>
        <BalanceForm zodSchema={createBalanceSchema} onSubmit={onSubmit} />
      </ContentMain>

      <ContentFooter>
        <ContentCancelButton onClick={() => navigate('/balances')}>
          Cancelar
        </ContentCancelButton>
        <ContentButton form="balance_form" type="submit">
          Criar
        </ContentButton>
      </ContentFooter>
    </Content>
  )
}
