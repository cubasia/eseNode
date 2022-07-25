"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const server = (0, node_http_1.createServer)((request, response) => {
    console.log("request received");
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.end("<html><body><h1>Welcome to Magico Peppe Server!</h1></body></html>");
});
server.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});
