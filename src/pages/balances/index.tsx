import { TableCell, TableRow } from '@mui/material'

import {
  Content,
  ContentHeader,
  ContentButton,
  ContentHeaderTitle,
  ContentMain,
} from '@/layout'
import { DataTable, DataTableActions, DeleteDialog } from '@/components'
import { BalanceProps } from '@/types/balance'
import { convertToMonetaryValue } from '@/utils/convertToMonetaryValue'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const table_headings = [
  'Nome',
  'Descrição',
  'Valor inicial',
  'Valor utilizado',
  'Valor restante',
]

const balances: BalanceProps[] = [
  {
    name: 'Salário',
    description: 'Mês de Novembro',
    initial_value: 1200,
    used_value: 800,
    remaining_value: 400,
  },
  {
    name: 'Bônus',
    description: 'Mês de Novembro',
    initial_value: 200,
    used_value: 100,
    remaining_value: 100,
  },
]

export function BalancesPage() {
  const navigate = useNavigate()
  const [balanceToDelete, setBalanceToDelete] = useState<BalanceProps | null>(null)

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const handleOpenDeleteDialog = (balance: BalanceProps) => {
    setOpenDeleteDialog(true)
    setBalanceToDelete(balance)
  }
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false)
    setBalanceToDelete(null)
  }

  return (
    <>
      <Content>
        <ContentHeader>
          <ContentHeaderTitle>Saldos</ContentHeaderTitle>
          <ContentButton
            onClick={() => navigate('/balances/create')}
            aria-label="Criar pagamento"
          >
            Criar
          </ContentButton>
        </ContentHeader>

        <ContentMain>
          <DataTable
            headings={table_headings}
            data={balances}
            rowComponent={({ item: balance }) => (
              <TableRow
                key={balance.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {balance.name}
                </TableCell>
                <TableCell>{balance.description}</TableCell>
                <TableCell>{convertToMonetaryValue(balance.initial_value)}</TableCell>
                <TableCell>{convertToMonetaryValue(balance.used_value)}</TableCell>
                <TableCell>{convertToMonetaryValue(balance.remaining_value)}</TableCell>

                <TableCell align="right">
                  <DataTableActions
                    onEdit={() => navigate('/balances/edit', { state: { balance } })}
                    onDelete={() => handleOpenDeleteDialog(balance)}
                  />
                </TableCell>
              </TableRow>
            )}
          />
        </ContentMain>
      </Content>

      <DeleteDialog
        title={`Deseja deletar o saldo: ${balanceToDelete?.name}?`}
        text="Se excluir este saldo, esta ação não poderá ser revertida. Tem certeza que deseja excluir?"
        isOpen={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      />
    </>
  )
}
