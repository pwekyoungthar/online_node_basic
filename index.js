const http = require("http");
const fs = require("fs");

// Read API Data
const apiData = fs.readFileSync(`${__dirname}/dev-data/products.json`, "utf-8");
const dataObj = JSON.parse(apiData);

//Read Template
const templateHome = fs.readFileSync(
  `${__dirname}/template/index.html`,
  "utf-8"
);

const server = http.createServer((request, response) => {
  const pathName = request.url;
  if (pathName === "/" || pathName === "/home") {
    response.writeHead(200, {
      "Content-type": "text/html",
    });
    response.end(templateHome);
  } else if (pathName === "/api") {
    response.writeHead(200, {
      "Content-type": "application/json",
    });
    response.end(apiData);
  } else if (pathName === "/product") {
    response.end("This is Product Page");
  } else {
    response.writeHead(404, {
      "Content-type": "text/html",
    });
    response.end("<h1>Page Not Found</h1>");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log(`Server Running and Request Listening....`);
});
