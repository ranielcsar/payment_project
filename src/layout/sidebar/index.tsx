import { NavLink } from 'react-router-dom'

export function Sidebar() {
  return (
    <aside className="col-[1] row-[2] grid h-full w-64 auto-rows-[3rem] items-center bg-neutral-800 py-8 text-neutral-50">
      <NavLink to="/" className="w-max px-5">
        Pagamentos
      </NavLink>

      <NavLink to="/balances" className="w-max px-5">
        Saldos
      </NavLink>
    </aside>
  )
}
