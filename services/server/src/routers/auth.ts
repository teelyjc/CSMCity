import { Router } from 'express';
import { UserModel, UserData } from '@model/users';
import bcrypt from 'bcryptjs';
import passport from 'passport';

import type { Request, Response, NextFunction } from 'express';

// baseUrl: http://localhost:port/auth/path
const AuthRouter: Router = Router();

AuthRouter.post(
  '/signin',
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (error: any, user: UserData, info: any) => {
      if (error) return res.status(503).json({ success: false, message: info.message });
      if (!user) return res.status(401).json({ success: false, message: info.message });

      req.login(user, (error) => {
        if (error) return res.status(503).json({ success: false, message: error });
        return res.status(200).json({ success: true, message: info.message, user: req.user });
      });

    })(req, res, next);
})

AuthRouter.post('/signup', async (req: Request, res: Response) => {
  const { username, password, email } = await req.body;

  UserModel.findOne({ username }, (error: any, user: UserData) => {
    if (error) return res.status(503).json({
      success: false,
      error,
    });

    if (user) return res.status(401).json({
      success: false,
      message: 'username is already exist.'
    });

    const salts = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salts);

    UserModel.create({
      username: username,
      password: hashed,
      email: email,
      salt: salts
    }).then(result => {
      if (result) return res.status(201).json({
        success: true,
        message: 'register successfully.'
      });
    })
  })
})

AuthRouter.delete('/signout', (req: Request, res: Response, next: NextFunction) => {
	if (!req.isAuthenticated()) return res.status(401).json({ success: false, message: 'you\'re not logged in.' })
  req.logout((error) => {
    if (error) return next(error);
    req.session.destroy(() => {
      return res.status(200).json({ success: true, message: 'Signout successfully' });
    });
  });
})

AuthRouter.get('/user', (req: Request, res: Response) => {
	if (req.isAuthenticated()) return res.status(200).json({  success: true, user: req.user })
})

export { AuthRouter };
