import { Outlet, Route, Routes } from 'react-router-dom'
import { MainLayout } from '@/layout'
import { PaymentsPage, BalancesPage } from '@/pages'

import { CreatePayment } from '@/pages/payments/create'
import { EditPayment } from '@/pages/payments/edit'

import { CreateBalance } from '@/pages/balances/create'
import { EditBalance } from '@/pages/balances/edit'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<p>LOGIN</p>} />
      </Route>

      <Route element={<MainElement />}>
        <Route path="/" element={<PaymentsPage />} />
        <Route path="/create" element={<CreatePayment />} />
        <Route path="/edit" element={<EditPayment />} />
      </Route>

      <Route element={<MainElement />}>
        <Route path="/balances" element={<BalancesPage />} />
        <Route path="/balances/create" element={<CreateBalance />} />
        <Route path="/balances/edit" element={<EditBalance />} />
      </Route>
    </Routes>
  )
}

function AuthLayout() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-blue-200 text-3xl text-slate-800">
      <Outlet />
    </main>
  )
}

function MainElement() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}
