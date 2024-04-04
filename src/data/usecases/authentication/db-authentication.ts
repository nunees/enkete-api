import { type Authentication } from "../../../domain/usecases/authentication";
import {
  type AuthenticationModel,
  type HashComparer,
  type LoadAccountByEmailRepository,
  type TokenGenerator,
  type UpdateAccessTokenReposiory

} from "./db-authentication-protocols"

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly tokenGenerator: TokenGenerator
  private readonly updateAccessTokenReposiory: UpdateAccessTokenReposiory

  constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository, hashComparer: HashComparer, tokenGenerator: TokenGenerator, updateAccessTokenReposiory: UpdateAccessTokenReposiory) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenReposiory = updateAccessTokenReposiory
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenReposiory.update(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
