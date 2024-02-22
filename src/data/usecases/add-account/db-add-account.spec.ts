import { type Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  encripterStub: Encrypter
}

const makeSut = (): SutTypes => {
  class EncripterStub {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => { resolve('hashed_password') })
    }
  }
  const encripterStub = new EncripterStub()
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
})
