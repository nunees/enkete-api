export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`Invalid param: ${paramName}`)
    // is a best practice to set the name of the class
    this.name = 'MissingParamError'
  }
}
