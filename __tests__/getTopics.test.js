const { app } = require("../db/app.js");
const request = require("supertest");
const connection = require("../db/connection.js");
const seed = require("../db/seeds/seed.js")
const data = require("../db/data/test-data")

beforeEach(() => {
    return seed(data)
})

afterAll(() => {
  return connection.end();
});

describe("api/topics", () => {
  it("GET - status: 200 - responds with array of snacks", () => {
    return request(app)
      .get("/api/topics")
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
        expect(response.statusCode).toBe(404)
        expect(response.text).toBe("404 - Not Found")
    })
  });
});
