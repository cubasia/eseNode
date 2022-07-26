import session from "express-session";
import config from "../../configuration/config";
console.log(config,"sessione");
export function initSessionMiddleware() {
    return session({
      secret:config.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    });
}