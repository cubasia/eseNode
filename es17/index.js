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
var cors = require("cors");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
var corsOptions = {
    origin: " http://localhost:8080"
};
app.use(cors(corsOptions));
app.get("/", async (req, res) => {
    const planets = await prisma.planet.findMany();
    res.status(201).json(planets);
});
app.get("/:id(\\d+)", async (req, res, next) => {
    const planetId = Number(req.params.id);
    const planet = await prisma.planet.findUnique({
        where: { id: planetId },
    });
    if (!planet) {
        res.status(404);
        return next(`Cannot Get /planets/${planetId}`);
    }
    res.json(planet);
});
app.put("/:id(\\d+)", (0, validation_1.validate)({ body: validation_1.planetSchemaUpdate }), async (request, response, next) => {
    const planetData = request.body;
    const planetId = Number(request.params.id);
    try {
        const planet = await prisma.planet.update({
            where: { id: planetId },
            data: planetData,
        });
        response.status(200).json(planet);
    }
    catch (error) {
        response.status(404);
        next(`Cannot PUT /planets/${planetId}`);
    }
});
app.delete("/:id(\\d+)", async (request, response, next) => {
    const planetId = Number(request.params.id);
    try {
        await prisma.planet.delete({
            where: { id: planetId },
        });
        response.status(204).end();
    }
    catch (error) {
        response.status(404);
        next(`Cannot DELETE /planets/${planetId}`);
    }
});
app.post("/", (0, validation_1.validate)({ body: validation_1.planetSchema }), async (req, res) => {
    const planetData = req.body;
    const planet = await prisma.planet.create({
        data: planetData,
    });
    res.status(201).json(planet);
});
app.listen(process.env.PORT, () => console.log("listening on port " + process.env.PORT));
