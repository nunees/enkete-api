import { type Encrypter } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  encripterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncripterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => { resolve('hashed_password') })
    }
  }
  return new EncripterStub()
}

const makeSut = (): SutTypes => {
  const encripterStub = makeEncrypter()
  const sut = new DbAddAccount(encripterStub)
  return {
    sut,
    encripterStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call encripter with correct password',async () => {
    const { sut, encripterStub } = makeSut()
    const encriptSpy = jest.spyOn(encripterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encriptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Encrypter throws',async () => {
    const { sut, encripterStub } = makeSut()
    jest.spyOn(encripterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
})
