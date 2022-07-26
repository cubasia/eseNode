//retrive all resources
import "dotenv/config";
import config from "../configuration/config"
import express from "express";
import bodyParser from "body-parser";
import Routes from "../route/route";
var cors = require("cors");
//const upload = initMulterMiddleware()

const app = express();
app.use(bodyParser.json())
var corsOptions = {
  origin: " http://localhost:8080"
  
};
app.use(cors(corsOptions));

app.use(Routes)

const PORT= config.PORT
app.listen(PORT, () =>
  console.log("listening on port " + PORT)
);
