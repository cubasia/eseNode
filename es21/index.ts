//retrive all resources
import "dotenv/config";
import config from "../configuration/config"
import express from "express";
import bodyParser from "body-parser";
import Routes from "../route/route";
import authRoutes from "../route/auth";
import { initSessionMiddleware } from "../middleware/authentication/session";
import { passport } from "../middleware/authentication/passport";

var cors = require("cors");

//const upload = initMulterMiddleware()

const app = express();

var corsOptions = {
  origin: " http://localhost:8080"
  
};
app.use(bodyParser.json());
app.use(cors(corsOptions));
// app.use(initSessionMiddleware());
// app.use(passport.initialize());
// app.use(passport.session());
app.use(Routes)
app.use(authRoutes)

const PORT= config.PORT
app.listen(PORT, () =>
  console.log("listening on port " + PORT)
);
