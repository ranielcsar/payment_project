import { forwardRef, PropsWithChildren, ReactElement, Ref, useState } from 'react'

import { Delete } from '@mui/icons-material'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog as MaterialDialog,
  Slide,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'


const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

type DialogProps = {
  title: string
  text: string
  isOpen: boolean
  onClose(): void
  onDelete(): void
}

export function DeleteDialog({
  title,
  text,
  isOpen,
  onClose,
  onDelete,
}: PropsWithChildren<DialogProps>) {
  return (
    <MaterialDialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="flex gap-2">
        <Delete color="error" className="mt-1" />
        {title}
      </DialogTitle>

      <DialogContent className="h-28">
        <DialogContentText id="alert-dialog-slide-description">{text}</DialogContentText>
      </DialogContent>

      <DialogActions className="flex w-full items-center justify-between">
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="contained" color="error" onClick={onDelete}>
          Excluir
        </Button>
      </DialogActions>
    </MaterialDialog>
  )
}
