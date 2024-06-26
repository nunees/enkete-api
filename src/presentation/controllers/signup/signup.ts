import { type HttpRequest, type HttpResponse, type Controller, type EmailValidator, type AddAccount } from '../signup/signup-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'
import { type Validation } from '../../protocols/validation'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor (addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
