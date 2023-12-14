import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { useForm, Controller, FieldValues } from 'react-hook-form'
import { ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type PaymentFormProps<T> = {
  zodSchema: ZodType<T, any, any>
  onSubmit(data: FieldValues): void
  defaultValues?: FieldValues
}

export function PaymentForm<T>({
  zodSchema,
  onSubmit,
  defaultValues,
}: PaymentFormProps<T>) {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues,
  })

  const isEditing = !!defaultValues

  return (
    <form
      className="flex h-full w-full flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
      id="payment_form"
    >
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Nome"
            variant="outlined"
            helperText={error ? error.message : null}
            onChange={onChange}
            value={value}
            error={!!error}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Descrição"
            variant="outlined"
            helperText={error ? error.message : null}
            onChange={onChange}
            value={value}
            error={!!error}
            disabled={isEditing}
          />
        )}
      />

      <Controller
        name="value"
        control={control}
        disabled={isEditing}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Valor"
            variant="outlined"
            helperText={error ? error.message : null}
            onChange={onChange}
            value={value}
            error={!!error}
            disabled={isEditing}
          />
        )}
      />

      <Controller
        name="balance"
        control={control}
        disabled={isEditing}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl error={!!error} disabled={isEditing}>
            <InputLabel id="balance">Selecione o saldo a utilizar</InputLabel>
            <Select
              inputProps={{ 'aria-label': 'Without label' }}
              value={value}
              onChange={onChange}
              error={!!error}
              label="Selecione o saldo a utilizar"
              labelId="balance"
            >
              <MenuItem value={undefined}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>{error ? error.message : null}</FormHelperText>
          </FormControl>
        )}
      />
    </form>
  )
}
