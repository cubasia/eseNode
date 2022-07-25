import express from "express";


const app = express();

app.get("/", (req, res, ) => {
  
  //res.status(200).send("Tutto ok")
  res.status(200).json({ location: "Earth" });
});
 
app.listen(3000, () => {
  console.log("Server is running on porta " + 3000);
});

export default app