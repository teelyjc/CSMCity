declare namespace Express {
    export interface User {
      _id: string;
      username: string;
      password: string;
      email: string;
      salt: string
    }
  }