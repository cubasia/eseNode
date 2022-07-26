
import passport from "passport";
import passportGitHub2 from "passport-github2"
import { RequestHandler } from "express";

import config from "../../configuration/config"
// console.log(config,"passport");

const githubStrategy = new passportGitHub2.Strategy(
  {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: config.CALLBACK_URL,
    scope: ["user.read"],
    
  },
  function (
    accesToken: string,
    refreshToken: string,
    profile: { [key: string]: string },
    done: (error: null, user: Express.User) => void
  ) {
    const user: Express.User = {
      username: profile.username,
    };

    done(null, user);
  }
);

passport.use(githubStrategy)
passport.serializeUser<Express.User>((user,done)=> done(null, user))
passport.deserializeUser<Express.User>((user, done) => done(null, user))

const checkAuthorization: RequestHandler = (req, res, next) => { 
  if (req.isAuthenticated()) { 
    return next()
  }

  res.status(401).end()
}
export {passport,checkAuthorization}