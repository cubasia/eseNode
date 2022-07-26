"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//retrive all resources
require("dotenv/config");
const config_1 = __importDefault(require("../configuration/config"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const route_1 = __importDefault(require("../route/route"));
var cors = require("cors");
//const upload = initMulterMiddleware()
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
var corsOptions = {
    origin: " http://localhost:8080"
};
app.use(cors(corsOptions));
app.use(route_1.default);
const PORT = config_1.default.PORT;
app.listen(PORT, () => console.log("listening on port " + PORT));
