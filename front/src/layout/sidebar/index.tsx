import { removeTokenFromLocalStorage } from '@/utils/localStorage'
import { AccountBalanceWallet, Logout, Paid } from '@mui/icons-material'
import { Button, Divider } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'

export function Sidebar() {
  const navigate = useNavigate()

  const logout = () => {
    removeTokenFromLocalStorage()
    navigate('/login')
  }

  return (
    <aside className="col-[1] row-[2] grid h-full w-64 auto-rows-[3rem] items-center bg-neutral-800 py-8 text-neutral-50">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${
            isActive ? 'bg-neutral-600' : 'none'
          } flex w-full items-center gap-6 px-5 py-2 hover:bg-neutral-600`
        }
      >
        <Paid className="text-neutral-400" />
        Pagamentos
      </NavLink>

      <NavLink
        to="/balances"
        className={({ isActive }) =>
          `${
            isActive ? 'bg-neutral-600' : 'none'
          } flex w-full items-center gap-6 px-5 py-2 hover:bg-neutral-600`
        }
      >
        <AccountBalanceWallet className="text-neutral-400" />
        Saldos
      </NavLink>

      <Divider />

      <Button
        className="flex w-max items-center gap-6 !px-5 py-2 hover:text-blue-600"
        onClick={logout}
        color="inherit"
        variant="text"
      >
        <Logout className="inherit" />
        Sair da conta
      </Button>
    </aside>
  )
}
