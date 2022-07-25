//retrive all resources
import 'dotenv/config' 
import express from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.get("/", async (req, res) => { 
const planets = await prisma.planet.findMany();
res.status(201).json(planets);
})



app.listen(process.env.PORT, () => console.log('listening on port ' + process.env.PORT));

