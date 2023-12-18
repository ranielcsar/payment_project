import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'

import { MainLayout } from '@/layout'
import { BalancesPage, LoginPage, PaymentsPage } from '@/pages'
import { CreateBalance } from '@/pages/balances/create'
import { EditBalance } from '@/pages/balances/edit'
import { CreatePayment } from '@/pages/payments/create'
import { EditPayment } from '@/pages/payments/edit'
import { getTokenFromLocalStorage } from '@/utils/localStorage'
import { PropsWithChildren } from 'react'
import { RegisterPage } from '@/pages/register'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})

export function AppRoutes() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<MainElement />}>
          <Route path="/" element={<PaymentsPage />} />
          <Route path="/create" element={<CreatePayment />} />
          <Route path="/edit" element={<EditPayment />} />

          <Route path="/balances" element={<BalancesPage />} />
          <Route path="/balances/create" element={<CreateBalance />} />
          <Route path="/balances/edit" element={<EditBalance />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

function AuthLayout() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-blue-200 text-3xl text-slate-800">
      <Outlet />
    </main>
  )
}

export function RequireAuth({ children }: PropsWithChildren<unknown>) {
  const token = getTokenFromLocalStorage()
  const location = useLocation()

  return token ? children : <Navigate to="/login" state={{ from: location }} replace />
}

function MainElement() {
  return (
    <RequireAuth>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </RequireAuth>
  )
}
