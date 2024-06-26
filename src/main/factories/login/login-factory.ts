import env from "../../config/env"
import { DbAuthentication } from "../../../data/usecases/authentication/db-authentication"
import { makeLoginValidation } from "./login-validation"
import { LogMongoRepository } from "../../../infra/db/mongodb/log-repository/log"
import { LoginController } from "../../../presentation/controllers/login/login"
import { Controller } from "../../../presentation/protocols"
import { LogControllerDecorator } from "../../decorators/log"
import { AccountMongoRepository } from "../../../infra/db/mongodb/account-repository/account"
import { BcryptAdapter } from "../../../infra/criptography/bcrypt-adapter/bcrypt-adapter"
import { JwtAdapter } from "../../../infra/criptography/jwt-adapter/jwt-adapter"

export const makeLoginController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
