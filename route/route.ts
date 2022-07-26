//retrive all resources
import express,{Router} from "express";
import { PrismaClient } from "@prisma/client";
import {
  validate,
  planetSchema,
  planetSchemaUpdate,
  PlanetData,
  PlanetDataUpdate,
} from "../middleware/validation";
import upload from "../middleware/multer/multer";

//const upload = initMulterMiddleware()
const prisma = new PrismaClient();
const router = Router();

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

router.put(
  "/:id(\\d+)",
  validate({ body: planetSchemaUpdate }),
  async (request, response, next) => {
    const planetData: PlanetDataUpdate = request.body;
    const planetId = Number(request.params.id);
    try {
      const planet = await prisma.planet.update({
        where: { id: planetId },
        data: planetData,
      });
      response.status(200).json(planet);
    } catch (error) {
      response.status(404);
      next(`Cannot PUT /planets/${planetId}`);
    }
  }
);

router.delete("/:id(\\d+)", async (request, response, next) => {
  const planetId = Number(request.params.id);
  try {
    await prisma.planet.delete({
      where: { id: planetId },
    });
    response.status(204).end();
  } catch (error) {
    response.status(404);
    next(`Cannot DELETE /planets/${planetId}`);
  }
});

router.post("/", validate({ body: planetSchema }), async (req, res) => {
  const planetData: PlanetData = req.body;
  const planet = await prisma.planet.create({
    data: planetData,
  });
  res.status(201).json(planet);
});

router.post(
  "/file",
  upload.single("file"), //photo è il nome del campo della form
  async (request, response, next) => {
    //console.log("request file", request.file);

    if (!request.file) {
      response.status(400);
      return next("No file uploaded.");
    }

    const Filename = request.file.originalname;

    response.status(201).json({ Filename });
  }
);

router.use("/file", express.static("uploads"));


export default router