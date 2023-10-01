const http = require("http");
const fs = require("fs");
const url = require("url");

const replaceTemplage = require("./ownmodules/replaceTemplage");

// Read API Data
const apiData = fs.readFileSync(`${__dirname}/dev-data/products.json`, "utf-8");
const dataObj = JSON.parse(apiData);

//Read Template
const templateHome = fs.readFileSync(
  `${__dirname}/template/index.html`,
  "utf-8"
);
const cardTemp = fs.readFileSync(`${__dirname}/template/card.html`, "utf-8");
const singleProductTemp = fs.readFileSync(
  `${__dirname}/template/single_product.html`,
  "utf-8"
);

const server = http.createServer((request, response) => {
  // const pathName = request.url;
  const { query, pathname } = url.parse(request.url, true);

  if (pathname === "/" || pathname === "/home") {
    response.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardHTML = dataObj
      .map((el) => replaceTemplage(cardTemp, el))
      .join("");
    const output = templateHome.replace(/{%CARDS%}/g, cardHTML);
    response.end(output);
  } else if (pathname === "/api") {
    response.writeHead(200, {
      "Content-type": "application/json",
    });
    response.end(apiData);
  } else if (pathname === "/product") {
    response.writeHead(200, {
      "Content-type": "text/html",
    });
    const singleData = dataObj[query.id];
    const output = replaceTemplage(singleProductTemp, singleData);
    response.end(output);
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
