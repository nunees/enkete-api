import { type HttpRequest, type Controller, type HttpResponse } from "../../presentation/protocols"
import { LogControllerDecorator } from "./log"

interface SutTypes {
  sut: Controller
  controllerStub: Controller
}

const makeSut = (): SutTypes => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          name: 'any_name'
        }
      }
      return new Promise(resolve => resolve(httpResponse))
    }
  }
  const controllerStub = new ControllerStub()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    sut,
    controllerStub
  }
}

// const makeController = (): Controller => {
//   class ControllerStub implements Controller {
//     async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
//       const httpResponse: HttpResponse = {
//         statusCode: 200,
//         body: {
//           name: 'any_name'
//         }
//       }
//       return new Promise(resolve => resolve(httpResponse))
//     }
//   }
//   return new ControllerStub()
// }

describe('Log Controller Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'any_name'
      }
    })
  })
})
