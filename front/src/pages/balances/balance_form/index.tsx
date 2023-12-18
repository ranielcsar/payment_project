import { convertToMonetaryValue } from '@/utils/convertToMonetaryValue'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '@mui/material'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { ZodType } from 'zod'

type BalanceFormProps<T> = {
  zodSchema: ZodType<T, any, any>
  onSubmit(data: FieldValues): void
  defaultValues?: FieldValues
}

export function BalanceForm<T>({
  zodSchema,
  onSubmit,
  defaultValues,
}: BalanceFormProps<T>) {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues,
  })

  const isEditing = !!defaultValues

  return (
    <form
      className="flex h-full w-full flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
      id="balance_form"
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
        name="initial_value"
        control={control}
        disabled={isEditing}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Valor"
            variant="outlined"
            helperText={error ? error.message : null}
            onChange={onChange}
            value={isEditing ? convertToMonetaryValue(value) : value}
            error={!!error}
            disabled={isEditing}
          />
        )}
      />
    </form>
  )
}
