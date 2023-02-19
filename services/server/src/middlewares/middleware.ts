import { database } from './database'
import { passport } from './passport'
import { sessionServer } from './session'

import type { Application } from 'express'

export const middleware = (app: Application) => {
  return app
    .use(database)
    .use(sessionServer)
    .use(passport.initialize())
    .use(passport.session())
}