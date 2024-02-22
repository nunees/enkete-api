import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => { resolve('hash') })
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values',async () => {
    const saltRounds = 12
    const sut = new BcryptAdapter(saltRounds)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', saltRounds)
  })

  test('Should return a hash on success',async () => {
    const saltRounds = 12
    const sut = new BcryptAdapter(saltRounds)
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
