
import { type AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { type LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository';
import { UpdateAccessTokenReposiory } from '../../../../data/protocols/db/update-access-token-repository';
import { type AccountModel } from '../../../../domain/models/account';
import { type AddAccountModel } from '../../../../domain/usecases/add-account';
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenReposiory {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(await accountCollection.findOne({ _id: result.insertedId }))
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: id },{ $set: { accessToken: token } })
  }
}
