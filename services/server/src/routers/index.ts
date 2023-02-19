import { Router } from 'express';
import mongoose from 'mongoose'

import type { Request, Response } from 'express';

const IndexRouter: Router = Router();

interface Data {
  name: string;
  success: boolean;
  status: {
    database: string
  }
  timestamp: Date;
}

IndexRouter.all('/', (req: Request, res: Response<Data>) => {
  res.status(200).json({
    name: "CSMCity-API-Server",
    success: true,
    status: {
      database: mongoose.STATES[mongoose.connection.readyState]
    },
    timestamp: new Date(),
  })
})

export { IndexRouter };
