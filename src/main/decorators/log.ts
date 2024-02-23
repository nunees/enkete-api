import { type Controller, type HttpRequest, type HttpResponse } from "../../presentation/protocols"

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller

  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    // const httpResponse = await this.controller.handle(httpRequest)
    // if (httpResponse.statusCode === 500) {
    //   // log error
    // }
    // return httpResponse
    await this.controller.handle(httpRequest)
    return new Promise(resolve => resolve({ statusCode: 200, body: {} }))
  }
}
