import { ServerError, Unauthorized } from '../../errors'
import { type HttpResponse } from '../../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new Unauthorized()
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(String(error.stack))
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
