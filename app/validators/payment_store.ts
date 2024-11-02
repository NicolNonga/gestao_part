import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  amount: 'preço',
  client_id: 'client',
  payment_method_id: 'metodo de pagamento',
  part_id: 'peça',
}

export const paymentValidator = vine.compile(
  vine.object({
    amount: vine.number(),
    client_id: vine.number().exists(async (db, value) => {
      const client = await db.from('clients').where('id', value).first()
      return client
    }),
    payment_method_id: vine.number().exists(async (db, value) => {
      const payment_method = await db.from('payment_methods').where('id', value).first()
      return payment_method
    }),
    part_id: vine.number().exists(async (db, value) => {
      const part = await db.from('parts').where('id', value).first()
      return part
    }),
  })
)
const validator = new SimpleMessagesProvider(
  {
    // Applicable for all fields
    'required': 'O {{ field }} é obrigatorio',
    'string': 'The value of {{ field }} field must be a string',
    'email': 'O campo {{field}} não um endereco de  email',
    'email.unique': 'Ja existe {{field}} com existe campo',
    'database.exists': ' O {{field}}  nao encontrado',
    'database.unique': 'Ja  existe um {{field}} cadastrado',

    // Error message for the custom fields
    'name.required': 'Please enter name',
    'password.required': 'Please enter password',
  },
  fields
)
paymentValidator.messagesProvider = validator
