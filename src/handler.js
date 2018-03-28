/* eslint-disable */

const path = require("path");
const fs = require("fs");
const request = require("request");
require("env2")("config.env");

const handleHome = (request, response) => {
  const filePath = path.join(__dirname, "..", "public", "index.html");

  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1>Sorry we can't find the home page</h1>");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(file);
    }
  });
};

const handleLatest = (req, res) => {
  let sources =
    "bbc-news, the-guardian-uk, the-new-york-times, al-jazeera-english";
  let numArticles = 30;
  
  request(
    `https://newsapi.org/v2/top-headlines?sources=${sources}&pageSize=${numArticles}&apiKey=${
      process.env.NEWS_API_KEY
    }`,
    (error, response, body) => {
      if (error) {
        console.log(error);
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>Sorry we can't find latest news</h1>");
      } else {
        const articles = JSON.parse(body).articles;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(articles));
      }
    }
  );
};

const handleStatic = (request, response) => {
  console.log("handle static reached");
  console.log("Request.url :", request.url);

  const extension = request.url.split(".")[1];
  console.log("Extension :", extension);

  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/js",
    ico: "image/x-icon",
    svg: "image/svg+xml"
  };

  const filePath = path.join(__dirname, "..", request.url);
  console.log("filePath: ", filePath);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("Sorry we can't find the static file");
    } else {
      response.writeHead(200, {
        "Content-Type": `${extensionType[extension]}`
      });
      console.log("Content type:", `${extensionType[extension]}`);
      response.end(file);
    }
  });
};

const handleSearch = (req, res) => {
  let searchedInput = req.url.split("=")[1];
  let sources =
    "bbc-news, the-guardian-uk, the-new-york-times, al-jazeera-english";
  let numArticles = 20;

  request(
    `https://newsapi.org/v2/everything?q=${searchedInput}&sources=${sources}&pageSize=${numArticles}&apiKey=${
      process.env.NEWS_API_KEY
    }`,
    (error, response, body) => {
      if (error) {
        console.log(error);
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>Sorry we can't find latest news</h1>");
      } else {
        const articles = JSON.parse(body).articles;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(articles));
      }
    }
  );
};
module.exports = {
  handleHome,
  handleLatest,
  handleStatic,
  handleSearch
};
