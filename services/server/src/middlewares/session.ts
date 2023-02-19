import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose'
import type { Request, Response, NextFunction } from 'express'

export const sessionServer = (req: Request, res: Response, next: NextFunction) => {
  return session({
    secret: "CSMCitySessionSecret12345",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    })
  })(req, res, next);
}