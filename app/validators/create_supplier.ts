import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  name: 'name',
  email: 'email',
  address: 'endereço',
  phoneNumber: 'telefone',
}
export const CreateSupplierValidator = vine.compile(
  vine.object({
    name: vine.string().unique(async (db, value) => {
      const name = await db.from('suppliers').where('name', value).first()
      return !name
    }),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const email = await db.from('suppliers').where('email', value).first()
        return !email
      }),
    address: vine.string().nullable(),
    phoneNumber: vine.string().unique(async (db, value) => {
      const phoneNumber = await db.from('suppliers').where('phone_number', value).first()
      return !phoneNumber
    }),
  })
)

export const smsProvider = new SimpleMessagesProvider(
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

CreateSupplierValidator.messagesProvider = smsProvider
