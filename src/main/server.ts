import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    // example of dynamic import (importing a module using a variable)
    const app = (await import ('./config/app')).default
    app.listen(env.port, () => console.log(`Server is running at http://localhost:${env.port}`))
  })
  .catch(console.error)
