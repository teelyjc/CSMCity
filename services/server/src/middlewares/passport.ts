import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel, UserData } from '@model/users';
import bcrypt from 'bcryptjs';

passport.use(
  new LocalStrategy({
    passReqToCallback: true,
  }, (
    req, username, password, done
  ) => {
    UserModel.findOne({ username: username }, (error: any, user: UserData) => {
      if (error) return done(error, false);
      if (!user) return done(null, false, { message: 'user not found' });

      const isCorrect = bcrypt.compareSync(password, user.password);
      if (isCorrect) return done(null, user, { message: 'Logged in successfully' });

      return done(null, false, { message: 'password not match' });
    })
  })
)

passport.serializeUser((user, done) => {
  done(null, user._id);
})

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (error: any, user: UserData) => {
    if (error) return done(error);
    done(null, user);
  })
})

export { passport }