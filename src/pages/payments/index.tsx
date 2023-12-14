import { TableCell, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import {
  Content,
  ContentHeader,
  ContentButton,
  ContentHeaderTitle,
  ContentMain,
} from '@/layout'

import { DataTable, DataTableActions, DeleteDialog } from '@/components'
import { PaymentProps } from '@/types/payment'
import { convertToMonetaryValue } from '@/utils/convertToMonetaryValue'
import { useState } from 'react'

const table_headings = ['Nome', 'Descrição', 'Valor']

const payments: PaymentProps[] = [
  {
    name: 'Mercado do mês de novembro',
    description: 'Cesta básica com feijão, arroz, etc.',
    value: 600,
  },
  {
    name: 'Feira',
    description: 'Mês de Novembro',
    value: 200,
  },
]

export function PaymentsPage() {
  const navigate = useNavigate()
  const [paymentToDelete, setPaymentToDelete] = useState<PaymentProps | null>(null)

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const handleOpenDeleteDialog = (payment: PaymentProps) => {
    setOpenDeleteDialog(true)
    setPaymentToDelete(payment)
  }
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false)
    setPaymentToDelete(null)
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
            data={payments}
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
                    onEdit={() => navigate('/edit', { state: { payment } })}
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
      />
    </>
  )
}
