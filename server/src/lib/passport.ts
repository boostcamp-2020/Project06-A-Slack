import config from '@/config';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';

export default () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.oauth.google.clientID,
        clientSecret: config.oauth.google.clientSecret,
        callbackURL: config.oauth.google.callbackURL,
      },
      async (accessToken, refreshToken, profile, done) => {
        done(undefined, { accessToken });
      },
    ),
  );
};
