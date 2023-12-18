import { RegisterProps } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextField } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useRegister } from './hooks/useRegister'
import { Loading } from '@/components'
import { useNotification } from '@/utils/useNotification'
// import { saveTokenOnLocalStorage } from '@/utils/localStorage'

const registerSchema = z.object({
  email: z
    .string({ required_error: 'Email é obrigatório' })
    .email({ message: 'Email inválido' }),
  name: z.string({ required_error: 'Nome é obrigatório' }),
  username: z.string({ required_error: 'Nome de usuário é obrigatório' }),
  password: z
    .string({ required_error: 'Senha é obrigatória' })
    .min(6, 'A senha precisa ter no mínimo 6 caracteres'),
})

export function RegisterPage() {
  const { handleSubmit, control } = useForm<RegisterProps>({
    resolver: zodResolver(registerSchema),
  })
  const { register, loading } = useRegister()
  const navigate = useNavigate()
  const { notification } = useNotification()

  const onSubmit: SubmitHandler<RegisterProps> = async (data) => {
    const result = await register(data)

    if (!result.message.includes('failed')) {
      notification(result.message, { type: 'success' })
      navigate('/login')
      return
    }

    return notification(result.response.data.error, { type: 'error' })
  }

  return (
    <form
      className="m-auto flex h-max w-96 flex-col gap-5 rounded-sm bg-white p-6 shadow-lg"
      onSubmit={handleSubmit(onSubmit)}
      id="login_form"
    >
      <section className="flex w-full flex-1 flex-col gap-4">
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
          name="name"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Nome"
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
          name="username"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Nome de usuário"
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
          {loading ? <Loading /> : 'Fazer Registro'}
        </Button>

        <NavLink to="/login" className="text-sm">
          Já possui conta? Entre agora!
        </NavLink>
      </footer>
    </form>
  )
}
