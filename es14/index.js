"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//retrive all resources
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.get("/", async (req, res) => {
    const planets = await prisma.planet.findMany();
    res.status(201).json(planets);
});
app.listen(process.env.PORT, () => console.log('listening on port ' + process.env.PORT));
