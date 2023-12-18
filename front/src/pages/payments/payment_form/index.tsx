import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from '@mui/material'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { ZodType } from 'zod'

import { useBalances } from '@/pages/balances/hooks/useBalances'
import { BalanceProps } from '@/types/balance'
import { convertToMonetaryValue } from '@/utils/convertToMonetaryValue'

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
  const { data, loading: loading_balances } = useBalances()

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
            value={isEditing ? convertToMonetaryValue(value) : value}
            error={!!error}
            disabled={isEditing}
          />
        )}
      />

      {loading_balances ? (
        <Skeleton variant="rectangular" width={'100%'} height={120} />
      ) : (
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
                  <em>Nenhum</em>
                </MenuItem>
                {data.balances?.map(
                  ({ id, name, used_value, initial_value, remaining_value }) => {
                    const value = used_value === 0 ? initial_value : remaining_value

                    return (
                      <MenuItem value={id} key={name}>
                        {`${name} - ${convertToMonetaryValue(value)}`}
                      </MenuItem>
                    )
                  },
                )}
              </Select>
              <FormHelperText>{error ? error.message : null}</FormHelperText>
            </FormControl>
          )}
        />
      )}
    </form>
  )
}

function handleBalanceLabel({
  name,
  initial_value,
  used_value,
  remaining_value,
}: BalanceProps) {
  const value = used_value === 0 ? initial_value : remaining_value

  return `${name} - ${convertToMonetaryValue(value)}`
}
