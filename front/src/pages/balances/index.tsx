import { Button, Skeleton, TableCell, TableRow } from '@mui/material'

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
import { useBalances } from './hooks/useBalances'
import { api } from '@/services/api'

const table_headings = [
  'Nome',
  'Descrição',
  'Valor inicial',
  'Valor utilizado',
  'Valor restante',
]

export function BalancesPage() {
  const navigate = useNavigate()
  const [balanceToDelete, setBalanceToDelete] = useState<BalanceProps | null>(null)
  const { data, loading: loading_balances, refetch } = useBalances()

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const handleOpenDeleteDialog = (balance: BalanceProps) => {
    setOpenDeleteDialog(true)
    setBalanceToDelete(balance)
  }
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false)
    setBalanceToDelete(null)
  }
  const handleDeleteBalance = async () => {
    try {
      await api.delete(`/balances/${balanceToDelete?.id}`)
      handleCloseDeleteDialog()
      refetch()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading_balances) {
    return (
      <Content>
        <div className="flex flex-col gap-4">
          <Skeleton variant="rectangular" width={'100%'} height={120} />
          <Skeleton variant="rectangular" width={'100%'} height={60} />
          <Skeleton variant="rectangular" width={'100%'} height={60} />
        </div>
      </Content>
    )
  }

  if (data.balances.length === 0) {
    return (
      <Content>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <h2 className="text-xl">Você não possui saldos</h2>
          <Button
            className="!rounded-full"
            onClick={() => navigate('/balances/create')}
            variant="contained"
          >
            CRIAR SALDO
          </Button>
        </div>
      </Content>
    )
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
            data={data.balances}
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
        onDelete={handleDeleteBalance}
      />
    </>
  )
}
