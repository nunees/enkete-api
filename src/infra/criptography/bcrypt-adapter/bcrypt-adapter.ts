import { type HashComparer } from '../../../data/protocols/criptography/hash-comparer'
import { type Hasher } from '../../../data/protocols/criptography/hasher'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
