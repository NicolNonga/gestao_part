import vine, { SimpleMessagesProvider } from '@vinejs/vine'
const field = {
  parts: 'Peças ',
}

export const CreateVehiclePart = vine.compile(
  vine.object({
    parts: vine.array(vine.number()),
    vehicleId: vine.number().exists(async (db, value) => {
      const vehicle = await db.from('vehicles').where('id', value).first()
      return vehicle
    }),
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

CreateVehiclePart.messagesProvider = validator
