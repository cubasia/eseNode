import session from "express-session";
import config from "../../configuration/config";

export function initSessionMiddleware() {
  //  console.log(config, "sessione");
    return session({
      secret:config.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    });
}