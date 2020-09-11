const express = require("express");
const app = express();
const port = 9000;

app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (_req, res) => {
  const githubRepos = {
    repos: [
      {
        id: 123,
        name: "best-repo",
        description: "seriously, the best one",
        stars: 5,
      },
    ],
  };
  res.send(githubRepos);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
