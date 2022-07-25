//retrive all resources
import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import {
  validate,
  planetSchema,
  PlanetData,
} from "../middleware/validation";

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json())
app.get("/", async (req, res) => {
  const planets = await prisma.planet.findMany();
  res.status(201).json(planets);
});

app.post("/", validate({ body: planetSchema }), async (req, res) => {

    const planetData: PlanetData = req.body;
    const planet = await prisma.planet.create({
      data: planetData,
    });
    res.status(201).json(planet);

  
});

app.listen(process.env.PORT, () =>
  console.log("listening on port " + process.env.PORT)
);
