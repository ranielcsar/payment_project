import {
  Content,
  ContentHeader,
  ContentHeaderTitle,
  ContentMain,
  ContentFooter,
  ContentButton,
  ContentCancelButton,
} from '@/layout'
import { BalanceForm } from '../balance_form'
import { SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { useLocation, useNavigate } from 'react-router-dom'
import { BalanceProps } from '@/types/balance'
import { useEditBalance } from '../hooks/useEditBalance'

const editBalanceSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório' }),
  description: z.string({ required_error: 'Descrição é obrigatório' }),
})

type BalanceFormInputs = {
  name: string
  description: string
}

type State = {
  balance: BalanceProps
}

export function EditBalance() {
  const location = useLocation()
  const navigate = useNavigate()
  const { balance } = location.state as State

  const { editBalance } = useEditBalance()

  const resetStateAndBack = () => navigate('/balances', { state: null })

  const onSubmit: SubmitHandler<BalanceFormInputs> = (data) => {
    editBalance({
      ...balance,
      ...data,
    }).then(resetStateAndBack)
  }

  return (
    <Content>
      <ContentHeader>
        <ContentHeaderTitle>Editar saldo</ContentHeaderTitle>
      </ContentHeader>

      <ContentMain>
        <BalanceForm
          defaultValues={balance}
          zodSchema={editBalanceSchema}
          onSubmit={onSubmit}
        />
      </ContentMain>

      <ContentFooter>
        <ContentCancelButton onClick={resetStateAndBack}>Cancelar</ContentCancelButton>
        <ContentButton form="balance_form" type="submit">
          Salvar
        </ContentButton>
      </ContentFooter>
    </Content>
  )
}
