import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  nome: 'nome',
  description: 'descrição',
  reference: 'referencia',
  price: 'preço',
  type_part_id: 'tipo de peca',
}

export const createPartValidator = vine.compile(
  vine.object({
    price: vine.number(),
    description: vine.string(),
    reference: vine.string(),
    nome: vine.string(),
    type_part_id: vine.number().exists(async (db, value) => {
      const typePart = await db.from('type_parts').where('id', value).first()
      return typePart
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
createPartValidator.messagesProvider = validator
