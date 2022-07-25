import supertest from "supertest"

import app from "./app";

//const app = createApp();

const request = supertest(app);

test("GET /", async () => {
  const response = await request
    .get("/")
    .expect(200)
    // .expect("Content-Type", " text/html");
    .expect("Content-Type", "application/json; charset=utf-8");

  expect(response.body).toEqual({ location: "Earth" });
 // expect(response.text).toEqual("Earth" );
});
