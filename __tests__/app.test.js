const { app } = require("../db/app.js");
const request = require("supertest");
const connection = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return connection.end();
});

describe.skip("TASK 3 -- api/topics", () => {
  it("GET - status: 200 - responds with array of snacks", () => {
    return request(app)
      .get("GET - /api/topics")
      .then((response) => {
        expect(response.body.topics.length).toBe(3);
        response.body.topics.forEach((topic) => {
          expect(typeof topic.description).toBe("string");
          expect(typeof topic.slug).toBe("string");
        });
      });
  });
  it('GET - status: 404 - responds with "404 - Not Found', () => {
    return request(app)
      .get("/api/incorrecturl")
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe("404 - Not Found");
      });
  });
});

describe("TASK 3.5 --- GET - /api", () => {
  it("GET - status: 2 - responds with JSON object containing all the endpoints in endpoints.test.js", () => {
    return request(app)
      .get("/api")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(typeof response).toBe("object");
      });
  });
  it("GET - status: 2 - responds with JSON object containing all the endpoints in endpoints.test.js", () => {
    return request(app)
      .get("/api-spelt-incorrectly")
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe("404 - Not Found")
      });
  });
});
