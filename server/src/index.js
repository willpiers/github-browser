const express = require("express");
const axios = require("axios").default;
const app = express();
const port = 9000;

const cache = {};
const cachingMiddleware = (req, res, next) => {
  const key = req.url;
  if (cache[key]) {
    res.send(cache[key]);
  } else {
    res.sendResponse = res.send;
    res.send = (body) => {
      cache[key] = body;
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
      // handle error
      console.log(error);
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
      // handle error
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
