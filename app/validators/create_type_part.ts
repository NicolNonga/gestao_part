import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const field = {
  type: 'tipo',
  description: 'descricao',
}

export const CreateTypeParts = vine.compile(
  vine.object({
    type: vine.string().unique(async (db, value) => {
      const type = await db.from('type_parts').where('type', value).first()
      return !type
    }),
    description: vine.string().nullable(),
  })
)
export const validator = new SimpleMessagesProvider(
  {
    // Applicable for all fields
    'required': 'O {{ field }} é obrigatorio',
    'string': 'The value of {{ field }} field must be a string',
    'database.exists': ' O {{field}}  nao encontrado',
    'database.unique': 'Ja  existe um {{field}} cadastrado',

    // Error message for the custom fields
    'name.required': 'Please enter name',
    'password.required': 'Please enter password',
  },
  field
)
CreateTypeParts.messagesProvider = validator
