const request = require("supertest");
const app = require("./app");

describe(`GET /fetch`, () => {
  const data = {
    url: "https://www.imdb.com/title/tt0117500"
  };
  it("responds with status 200", (done) => {
    request(app)
      .post("/fetch")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});
