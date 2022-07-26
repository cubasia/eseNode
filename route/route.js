"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//retrive all resources
const express_1 = __importStar(require("express"));
const client_1 = require("@prisma/client");
const validation_1 = require("../middleware/validation");
const multer_1 = __importDefault(require("../middleware/multer/multer"));
//const upload = initMulterMiddleware()
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const planets = await prisma.planet.findMany();
    res.status(201).json(planets);
});
router.get("/:id(\\d+)", async (req, res, next) => {
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
router.put("/:id(\\d+)", (0, validation_1.validate)({ body: validation_1.planetSchemaUpdate }), async (request, response, next) => {
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
router.delete("/:id(\\d+)", async (request, response, next) => {
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
router.post("/", (0, validation_1.validate)({ body: validation_1.planetSchema }), async (req, res) => {
    const planetData = req.body;
    const planet = await prisma.planet.create({
        data: planetData,
    });
    res.status(201).json(planet);
});
router.post("/file", multer_1.default.single("file"), //photo è il nome del campo della form
async (request, response, next) => {
    //console.log("request file", request.file);
    if (!request.file) {
        response.status(400);
        return next("No file uploaded.");
    }
    const Filename = request.file.originalname;
    response.status(201).json({ Filename });
});
router.use("/file", express_1.default.static("uploads"));
exports.default = router;
