"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//retrive all resources
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const client_1 = require("@prisma/client");
const validation_1 = require("../middleware/validation");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get("/", async (req, res) => {
    const planets = await prisma.planet.findMany();
    res.status(201).json(planets);
});
app.post("/", (0, validation_1.validate)({ body: validation_1.planetSchema }), async (req, res) => {
    //app.post("/",  async (req, res) => {
    //  console.log(JSON.stringify(req.body));
    const planetData = req.body;
    const planet = await prisma.planet.create({
        data: planetData,
    });
    res.status(201).json(planet);
    //res.status(201).json({planet:"aaaa"});
});
app.listen(process.env.PORT, () => console.log("listening on port " + process.env.PORT));
