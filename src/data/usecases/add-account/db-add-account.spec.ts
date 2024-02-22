import { DbAddAccount } from './db-add-account'

describe('DbAddAccount Usecase', () => {
  test('Should call encripter with correct password',async () => {
    class EncripterStub {
      async encrypt (value: string): Promise<string> {
        return new Promise(resolve => { resolve('hashed_password') })
      }
    }
    const encripterStub = new EncripterStub()
    const sut = new DbAddAccount(encripterStub)
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
