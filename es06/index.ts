import { createServer } from "node:http";
import myJson from "./myjson"
const server = createServer((request, response) => {
  console.log("request received");

  response.statusCode = 200;

  response.setHeader("Content-Type", "application/json");

//  const jsonResponseBody = JSON.stringify({ location: "Earth" })//;
  const jsonResponseBody = JSON.stringify(myJson);

  response.end(jsonResponseBody);
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
