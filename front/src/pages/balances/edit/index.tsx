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
import { BalanceProps } from '@/types/balance'

import { BalanceForm } from '../balance_form'
import { useEditBalance } from '../hooks/useEditBalance'
import { useNotification } from '@/utils/useNotification'

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
  const { notification } = useNotification()

  const { editBalance } = useEditBalance()

  const resetStateAndNavigateBack = () => navigate('/balances', { state: null })

  const onSubmit: SubmitHandler<BalanceFormInputs> = async (data) => {
    const result = await editBalance({
      ...balance,
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
        <ContentCancelButton onClick={resetStateAndNavigateBack}>
          Cancelar
        </ContentCancelButton>
        <ContentButton form="balance_form" type="submit">
          Salvar
        </ContentButton>
      </ContentFooter>
    </Content>
  )
}
