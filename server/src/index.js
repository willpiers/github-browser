const express = require("express");
const axios = require("axios").default;
const app = express();
const port = 9000;

// When we make a successful response, add the URL and response to cache as a key/value pair
// This would be improved by using a key/value database or implementing cache invalidation after x seconds
const cache = {};
const cachingMiddleware = (req, res, next) => {
  const key = req.url;
  if (cache[key]) {
    res.send(cache[key]);
  } else {
    res.sendResponse = res.send;
    res.send = (body) => {
      if (res.statusCode === 200) {
        cache[key] = body;
      }
      res.sendResponse(body);
    };
    next();
  }
};

app.get("/api/repositories", cachingMiddleware, (req, res) => {
  const { q, language, sort, order, page } = req.query;
  axios
    .get(
      `https://api.github.com/search/repositories?q=${q}+language:${language}&sort=${sort}&order=${order}&page=${page}`,
      {
        Accept: "application/vnd.github.v3+json",
      }
    )
    .then(function (response) {
      res.send(response.data.items);
    })
    .catch(function (error) {
      res.status(500).send({ error: error.toJSON() });
    });
});

app.get("/api/repository/:owner/:name", cachingMiddleware, (req, res) => {
  const { owner, name } = req.params;
  axios
    .get(`https://api.github.com/repos/${owner}/${name}`, {
      Accept: "application/vnd.github.v3+json",
    })
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      res.status(500).send({ error: error.toJSON() });
    });
});

app.listen(port, () => {
  console.log(`Github API server listening at http://localhost:${port}`);
});
