const {handleHome, handleLatest, handleStatic, handleSearch} = require("./handler");

const router = (request, response) => {
  const url = request.url;
  if (url === "/") {
    handleHome(request, response);
  } else if (url === "/latest") {
    handleLatest(request, response);
  } else if (url.indexOf("public") !== -1) {
    handleStatic(request, response);
  } else if (url.startsWith("/search")) {
    handleSearch(request, response);
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end("Page not found");
  }
};

module.exports = router;
