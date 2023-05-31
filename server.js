const http = require("http");
const fs = require("fs");
const path = require("path");
const routes = require("./routes.js");
global.DEBUG = true;
const logEvents = require("./logEvents.js");

const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("log", (event, level, msg) => logEvents(event, level, msg));

const server = http.createServer((request, response) => {
  if (DEBUG) console.log(request.url, request.method);

  if (request.url.startsWith("/images/")) {
    const imagePath = path.join(__dirname, "public", request.url);
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        response.statusCode = 404;
        response.end("Image not found");
      } else {
        const extension = path.extname(request.url).slice(1);
        const contentType = `image/${extension}`;
        response.setHeader("Content-Type", contentType);
        response.end(data);
      }
    });
  } else {
    let path = "./views/";
    switch (request.url) {
      case "/":
        myEmitter.emit("log", request.url, "home page was visited");
        path += "index.html";
        response.statusCode = 231;
        routes.indexPage(path, response);
        break;
      case "/about":
        myEmitter.emit("log", request.url, "about page was visited");
        path += "about.html";
        response.statusCode = 271;
        routes.aboutPage(path, response);
        break;
      case "/contact":
        myEmitter.emit("log", request.url, "contact page was visited");
        path += "contact.html";
        response.setHeader("Set-cookie", "Message=New");
        response.statusCode = 213;
        routes.contactPage(path, response);
        break;
      case "/funfacts":
        myEmitter.emit("log", request.url, "Let's see some facts!");
        path += "funfacts.html";
        response.statusCode = 260;
        routes.funfactsPage(path, response);
        break;
      case "/news":
        myEmitter.emit("log", request.url, "Want to see some news or weather?");
        path += "news.html";
        response.statusCode = 289;
        routes.newsPage(path, response);
        break;
      case "/pokemon":
        myEmitter.emit("log", request.url, "Pikachu, I choose you");
        path += "pokemon.html";
        response.statusCode = 208;
        routes.newsPage(path, response);
        break;
      default:
        myEmitter.emit("log", request.url, "ERROR", "Not a live page");
        path += "error.html";
        response.statusCode = 404;
        routes.errorPage(path, response);
        break;
    }
  }
});

server.listen(3000, "localhost", () => {
  console.log("listening on port 3000.");
});
