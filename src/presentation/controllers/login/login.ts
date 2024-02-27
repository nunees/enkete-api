import { MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http-helper";
import { type HttpRequest, type HttpResponse, type Controller } from "../../protocols";
import { type EmailValidator } from "../signup/signup-protocols";

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }
    if (!httpRequest.body.password) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
    }

    const { email } = httpRequest.body

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.emailValidator.isValid(email)

    return new Promise(resolve => resolve({ statusCode: 500, body: 'any_token' }))
  }
}
