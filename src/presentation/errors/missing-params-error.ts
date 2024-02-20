export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missing param: ${paramName}`)
    // is a best practice to set the name of the class
    this.name = 'MissingParamError'
  }
}
