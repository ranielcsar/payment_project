import { useState } from 'react'

import { Button, Skeleton, TableCell, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { DataTable, DataTableActions, DeleteDialog } from '@/components'
import {
  Content,
  ContentButton,
  ContentHeader,
  ContentHeaderTitle,
  ContentMain,
} from '@/layout'
import { api } from '@/services/api'
import { PaymentProps } from '@/types/payment'
import { convertToMonetaryValue } from '@/utils/convertToMonetaryValue'

import { usePayments } from './hooks/usePayments'
import { useNotification } from '@/utils/useNotification'

const table_headings = ['Nome', 'Descrição', 'Valor']

export function PaymentsPage() {
  const navigate = useNavigate()
  const [paymentToDelete, setPaymentToDelete] = useState<PaymentProps | null>(null)
  const { data, loading: loading_payments, refetch } = usePayments()
  const { notification } = useNotification()

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const handleOpenDeleteDialog = (payment: PaymentProps) => {
    setOpenDeleteDialog(true)
    setPaymentToDelete(payment)
  }
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false)
    setPaymentToDelete(null)
  }
  const handleDeletePayment = async () => {
    try {
      const result: any = await api.delete(`/payments/${paymentToDelete?.id}`)
      handleCloseDeleteDialog()
      refetch()

      if (!result.data.message) {
        return notification(result?.data.error, { type: 'error' })
      }

      notification(result.data.message, { type: 'success' })
    } catch (err) {
      console.error(err)
    }
  }

  if (loading_payments) {
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

  if (data.payments.length === 0) {
    return (
      <Content>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <h2 className="text-xl">Você não possui pagamentos</h2>
          <Button
            className="!rounded-full"
            onClick={() => navigate('/create')}
            variant="contained"
          >
            CRIAR PAGAMENTO
          </Button>
        </div>
      </Content>
    )
  }

  return (
    <>
      <Content>
        <ContentHeader>
          <ContentHeaderTitle>Pagamentos</ContentHeaderTitle>
          <ContentButton onClick={() => navigate('/create')} aria-label="Criar pagamento">
            Criar
          </ContentButton>
        </ContentHeader>

        <ContentMain>
          <DataTable
            headings={table_headings}
            data={data.payments}
            rowComponent={({ item: payment }) => (
              <TableRow
                key={payment.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {payment.name}
                </TableCell>
                <TableCell>{payment.description}</TableCell>
                <TableCell>{convertToMonetaryValue(payment.value)}</TableCell>

                <TableCell align="right">
                  <DataTableActions
                    onEdit={() =>
                      navigate('/edit', {
                        state: { payment: { ...payment, balance: payment.balanceId } },
                      })
                    }
                    onDelete={() => handleOpenDeleteDialog(payment)}
                  />
                </TableCell>
              </TableRow>
            )}
          />
        </ContentMain>
      </Content>

      <DeleteDialog
        title={`Deseja deletar o pagamento: ${paymentToDelete?.name}?`}
        text="Se excluir este pagamento, esta ação não poderá ser revertida. Tem certeza que deseja excluir?"
        isOpen={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onDelete={handleDeletePayment}
      />
    </>
  )
}
