import { MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http-helper";
import { type HttpRequest, type HttpResponse, type Controller } from "../../protocols";

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }
    if (!httpRequest.body.password) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
    }

    return new Promise(resolve => resolve({ statusCode: 500, body: 'any_token' }))
  }
}
