const handler = require("./handler");

const router = (request, response) => {
  const url = request.url;
  if (url === "/") {
    handler.handleHome(request, response);
  } else if (url === "/latest") {
    handler.handleLatest(request, response);
  } else if (url.indexOf("public") !== -1) {
    handler.handleStatic(request, response);
  } else if (url.startsWith("/search")) {
    handler.handleSearch(request, response);
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end("Page not found");
  }
};

module.exports = router;
