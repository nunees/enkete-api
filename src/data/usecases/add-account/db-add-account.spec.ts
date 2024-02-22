import { type Encrypter } from '../../protocols/encrypter'
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
})
