# Projeto Plataforma de Pagamentos [ranielcsar]

Sistema de pagamentos que permite aos usuários realizar pagamentos, gerenciar saldos e manter um registro organizado de suas atividades financeiras.

- Funcionalidades do Usuário
  - [x] Autenticação
  - [x] Fazer login e logout na aplicação.

- Pagamentos:
  - [x] Criar pagamentos.
  - [x] Visualizar a lista de pagamentos.
  - [x] Apagar um pagamento.
  - [x] Editar o nome de um pagamento.

      
- Saldos:
  - [x] Criar saldos.
  - [x] Visualizar a lista de saldos.
  - [x] Apagar um saldo.
  - [x] Editar o nome de um saldo.
 

Principais tipos:
```ts
export type PaymentProps = {
  id?: string
  name: string
  description: string
  value: number
  balance_to_use: string

  balanceId?: string
}

export type BalanceProps = {
  id?: string
  name: string
  description: string
  initial_value: number
  used_value: number
  remaining_value: number
}

export type LoginProps = {
  email: string
  password: string
}

export type RegisterProps = {
  email: string
  name: string
  username: string
  password: string
}

export type UserProps = {
  email: string
  name: string
  username: string
}
```

### Regras de negócio
- Gerenciar o valor restante em um saldo.
- Impedir que um saldo seja vinculado a um pagamento se o valor restante no saldo for menor que o do pagamento.
- Impedir que um saldo seja excluído caso um pagamento esteja vinculado a ele.
- Consumir o valor restante de um saldo quando o mesmo for usado em um pagamento.
- Devolver o valor consumido em um saldo se o pagamento a ele vinculado for excluído.
