import { NavLink } from 'react-router-dom'
import { AccountBalanceWallet, Paid } from '@mui/icons-material'

export function Sidebar() {
  return (
    <aside className="col-[1] row-[2] grid h-full w-64 auto-rows-[3rem] items-center bg-neutral-800 py-8 text-neutral-50">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${
            isActive ? 'bg-neutral-600' : 'none'
          } flex w-full items-center gap-4 px-5 py-2 hover:bg-neutral-600`
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
          } flex w-full items-center gap-4 px-5 py-2 hover:bg-neutral-600`
        }
      >
        <AccountBalanceWallet className="text-neutral-400" />
        Saldos
      </NavLink>
    </aside>
  )
}
