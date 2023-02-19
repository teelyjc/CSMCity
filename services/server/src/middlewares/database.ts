import mongoose from 'mongoose';
import type { Request, Response, NextFunction } from 'express'

export const database = async (req: Request, res: Response, next: NextFunction) => {
  if (!mongoose.connection.readyState) {
    console.log('Connection to MongoDB..');
    try {
      mongoose.set({ strictQuery: true })
      const { connection } = await mongoose.connect('mongodb://root:root@localhost:27017/MyServer?authSource=admin');
      if (connection) {
        console.log('Connection established');
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return next();
}