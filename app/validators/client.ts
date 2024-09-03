import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  name: 'nome',
  email: 'email',
  phoneNumber: 'telefone',
  address: 'endereço',
}
export const CreateClientValidator = vine.compile(
  vine.object({
    name: vine.string(),
    email: vine
      .string()
      .unique(async (db, value) => {
        const client = await db.from('clients').where('email', value).first()
        return !client
      })
      .email(),
    phoneNumber: vine.string().unique(async (db, value) => {
      const phoneNumber = await db.from('clients').where('phone_number', value).first()
      return !phoneNumber
    }),
    address: vine.string(),
  })
)
export const validationMessage = new SimpleMessagesProvider(
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
