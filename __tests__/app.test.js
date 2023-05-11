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
describe("TASK 3 -- api/topics", () => {
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
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe("404 - Not Found");
      });
  });
});
describe("TASK 3.5 --- GET - /api", () => {
  it("GET - status: 200 - responds with JSON object containing all the endpoints in endpoints.test.js", () => {
    return request(app)
      .get("/api")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(typeof response).toBe("object");
      });
  });
});
describe("TASK 4 --- GET - /api/articles/:article_id", () => {
  it("GET - status: 200 - responds with JSON object containing correct article contents", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {    
        expect(response.body.article.article_id).toBe(1)
        expect(response.body.article.title).toBe("Living in the shadow of a great man");
        expect(response.body.article.topic).toBe("mitch");
        expect(response.body.article.author).toBe("butter_bridge");
        expect(response.body.article.body).toBe("I find this existence challenging");
        expect(response.body.article.created_at).toBe("2020-07-09T19:11:00.000Z");
        expect(response.body.article.votes).toBe(100);
        expect(response.body.article.article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700');
      });
  });
  it('GET - status: 400 - responds with error message explaining it was a bad request', () => {
    return request(app)
    .get(`/api/articles/nonsense`)
    .expect(400)
    .then((response) => {
      expect(response.body).toEqual({ msg: "Invalid Request" })
    })
  });
  it(`GET - status: 404 - responds with error message explaining it was a valid request, but doesn't exist`, () => {
    return request(app)
    .get(`/api/articles/99999`)
    .then((response) => {
      expect(response.statusCode).toBe(404)
      expect(response.body).toEqual({ msg: "Not Found" })
    })
  });
});
