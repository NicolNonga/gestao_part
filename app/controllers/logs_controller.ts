import type { HttpContext } from '@adonisjs/core/http'
import Log from '../models/log.js'
import db from '@adonisjs/lucid/services/db'
import { differenceInMinutes } from 'date-fns'

export default class LogsController {
  async store({ request, response }: HttpContext) {
    const payload = await request.only([
      'user',
      'app_nome',
      'started',
      'ended',
      'stay_open_during',
      'mac_adress',
      'ip',
    ])
    try {
      await Log.create({
        user: payload.user,
        app_nome: payload.app_nome,
        started: payload.started,
        ended: payload.ended,
        mac_adress: payload.mac_adress,
        ip: payload.ip,
        stay_open_during: payload.stay_open_during,
      })

      return response.status(200).send({ message: 'log criado' })
    } catch (error) {
      return response.status(500).send({ message: 'Falha ao criar log' })
    }
  }

  async index({ response, request }: HttpContext) {
    const page = request.input('page')
    const limit = 10
    const data = await db.from('logs').paginate(page, limit)
    return response.status(200).send(data)
  }
  async dashboard({ response }: HttpContext) {
    const dashboard = await db
      .from('logs')
      .countDistinct('app_nome as total_app_nome')
      .countDistinct('user as total_users')
      .countDistinct('mac_adress as total_mac_address')
      .countDistinct('ip as total_ip')
      .first()

    return response.status(200).send({ data: dashboard })
  }
  async update({ response, request, params }: HttpContext) {
    const { log_id } = params
    const { ended_date } = request.only(['ended_date'])

    const log = await Log.query().where('id', log_id).first()
    const periodo = differenceInMinutes(ended_date, log?.started)

    log!.stay_open_during = Number(periodo)
    log!.ended = ended_date

    await log?.save()

    return response.status(200).send({ message: ' logs Actualizado' })
  }
}
