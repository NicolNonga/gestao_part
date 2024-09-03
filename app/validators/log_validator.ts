import vine from '@vinejs/vine'

export const createLogValidator = vine.compile(
    vine.object({
        user: vine.string().nullable(),
        app_nome: vine.string(),
        started: vine.date().optional(),
        ended: vine.date().optional(),
        stay_open_during: vine.number().nullable(),
        mac_adress: vine.string().nullable(),
        ip: vine.string().nullable()
    })
)