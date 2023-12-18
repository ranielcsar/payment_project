import { LoginProps } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextField } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useLogin } from './hooks/useLogin'
import { getTokenFromLocalStorage } from '@/utils/localStorage'
import { useEffect } from 'react'
import { saveTokenOnLocalStorage } from '@/utils/localStorage'
import { Loading } from '@/components'

const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email é obrigatório' })
    .email({ message: 'Email inválido' }),
  password: z
    .string({ required_error: 'Senha é obrigatória' })
    .min(6, 'A senha precisa ter no mínimo 6 caracteres'),
})

export function LoginPage() {
  const { handleSubmit, control } = useForm<LoginProps>({
    resolver: zodResolver(loginSchema),
  })
  const { login, loading } = useLogin()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<LoginProps> = async (data) => {
    const { token } = await login(data)

    if (token) {
      saveTokenOnLocalStorage(token)
      navigate('/')
    }
  }

  function checkIfHasTokenOnStorage() {
    const token = getTokenFromLocalStorage()

    if (token) return navigate('/')
  }

  useEffect(() => checkIfHasTokenOnStorage(), [])

  return (
    <form
      className="m-auto flex h-80 w-96 flex-col gap-5 rounded-sm bg-white p-6 shadow-lg"
      onSubmit={handleSubmit(onSubmit)}
      id="login_form"
    >
      <section className="flex w-full flex-1 flex-col">
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Email"
              type="email"
              className="flex-1"
              variant="outlined"
              helperText={error ? error.message : null}
              onChange={onChange}
              value={value}
              error={!!error}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Senha"
              className="flex-1"
              type="password"
              variant="outlined"
              helperText={error ? error.message : null}
              onChange={onChange}
              value={value}
              error={!!error}
            />
          )}
        />
      </section>

      <footer className="flex flex-[0.5] flex-col items-center gap-3">
        <Button
          variant="contained"
          className="h-10 w-full disabled:!bg-blue-400"
          type="submit"
          form="login_form"
          disabled={loading}
        >
          {loading ? <Loading /> : 'Fazer Login'}
        </Button>

        <NavLink to="/register" className="text-sm">
          Ainda não possui conta? Faça o registro!
        </NavLink>
      </footer>
    </form>
  )
}
