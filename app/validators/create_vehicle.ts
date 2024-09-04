import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  brand: 'marca',
  model: 'modelo',
  year: 'ano',
  vehicle_type_id: 'tipo de veiculo',
}

export const createVehicleValidator = vine.compile(
  vine.object({
    brand: vine.string(),
    model: vine.string(),
    year: vine.string(),
    vehicle_type_id: vine.number().exists(async (db, value) => {
      const vehicleType = await db.from('vehicle_types').where('id', value).first()
      return vehicleType
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
createVehicleValidator.messagesProvider = validator
