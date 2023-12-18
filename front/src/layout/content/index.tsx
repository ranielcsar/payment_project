import { PropsWithChildren } from 'react'

import { Button, ButtonProps, Typography } from '@mui/material'

type Props = PropsWithChildren<unknown>

export function Content({ children }: Props) {
  return (
    <section className="flex h-screen flex-col overflow-y-auto p-8 text-black">
      {children}
    </section>
  )
}

export const ContentHeader = ({ children }: Props) => (
  <header className="flex flex-[0.15] items-center justify-between">{children}</header>
)

export const ContentHeaderTitle = ({ children }: Props) => (
  <Typography className="text-xl text-black" variant="h5" component="h2">
    {children}
  </Typography>
)

export const ContentButton = ({ children, ...props }: ButtonProps) => (
  <Button color="primary" variant="contained" {...props}>
    {children}
  </Button>
)

export const ContentCancelButton = ({ children, ...props }: ButtonProps) => (
  <Button color="primary" variant="outlined" {...props}>
    {children}
  </Button>
)

export const ContentMain = ({ children }: Props) => (
  <div className="w-full flex-[2] overflow-y-auto py-2">{children}</div>
)

export const ContentFooter = ({ children }: Props) => (
  <footer className="flex flex-[0.5] items-center justify-between">{children}</footer>
)
