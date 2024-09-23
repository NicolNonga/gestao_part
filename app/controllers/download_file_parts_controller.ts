import Part from '#models/part'
import type { HttpContext } from '@adonisjs/core/http'

export default class DownloadFilePartsController {
  async download({ response, params }: HttpContext) {
    const { fileName } = params
    const part = await Part.query().where('file_name', fileName).first()
    if (!part) return response.badRequest({ message: 'ficheiro nao encontrado' })
    const filePath = `storage/updloads/${part?.fileName}`

    return response.download(filePath)
  }
}
