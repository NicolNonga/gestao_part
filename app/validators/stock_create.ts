import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  partId: 'peca_id',
  supplieId: 'fornecedor_id',
  quantity: 'quantidade',
}

export const createStockValidator = vine.compile(
  vine.object({
    partId: vine.number().exists(async (db, value) => {
      const part = await db.from('parts').where('id', value).first()
      return part
    }),
    supplieId: vine.number().exists(async (db, value) => {
      const supplier = await db.from('suppliers').where('id', value).first()
      return supplier
    }),
    quantity: vine.number(),
  })
)
const validatorMessage = new SimpleMessagesProvider(
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
createStockValidator.messagesProvider = validatorMessage
