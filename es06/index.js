"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const myjson_1 = __importDefault(require("./myjson"));
const server = (0, node_http_1.createServer)((request, response) => {
    console.log("request received");
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    //  const jsonResponseBody = JSON.stringify({ location: "Earth" })//;
    const jsonResponseBody = JSON.stringify(myjson_1.default);
    response.end(jsonResponseBody);
});
server.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});
