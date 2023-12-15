import { ChangeEvent, FunctionComponent, useState } from 'react'
import { Delete, Edit } from '@mui/icons-material'
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'

type DataTableProps<T> = {
  headings: string[]
  data: T[]
  rowComponent: FunctionComponent<{ item: T }>
}

export function DataTable<T>({
  headings,
  data,
  rowComponent: RowComponent,
}: DataTableProps<T>) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Table aria-label="data-table" className="relative">
      <TableHead>
        <TableRow>
          {headings.map((heading, index) => (
            <TableCell key={heading} align={index === headings.length ? 'right' : 'left'}>
              {heading}
            </TableCell>
          ))}
          <TableCell align="right">Ações</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((item) => (
          <RowComponent item={item} key={JSON.stringify(item).slice(6)} />
        ))}
      </TableBody>

      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        className="absolute right-0 w-max"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Table>
  )
}

type ActionsProps = {
  onEdit(): void
  onDelete(): void
}

export function DataTableActions({ onEdit, onDelete }: ActionsProps) {
  return (
    <div className="ml-auto flex w-max items-center gap-4">
      <IconButton arial-label="Editar" onClick={onEdit}>
        <Edit />
      </IconButton>

      <IconButton arial-label="Deletar" color="error" onClick={onDelete}>
        <Delete />
      </IconButton>
    </div>
  )
}
