import { PropsWithChildren } from 'react'

import { Header } from '../header'
import { Sidebar } from '../sidebar'

type Props = Readonly<PropsWithChildren<unknown>>

export function MainLayout({ children }: Props) {
  return (
    <div className="grid h-screen grid-cols-[max-content,1fr] grid-rows-[max-content,1fr] overflow-hidden">
      <Header />

      <Sidebar />

      <main className="h-ull col-[2] row-[2] flex w-full flex-col bg-slate-50">
        {children}
      </main>
    </div>
  )
}
