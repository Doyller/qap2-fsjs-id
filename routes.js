const fs = require("fs");
const path = require("path");

function serveStaticFile(filePath, response) {
  const fileExtension = path.extname(filePath).toLowerCase();
  const contentType = getContentType(fileExtension);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.statusCode = 404;
      response.end("File not found");
    } else {
      response.setHeader("Content-Type", contentType);
      response.statusCode = 200;
      response.end(data);
    }
  });
}

function getContentType(fileExtension) {
  switch (fileExtension) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
}

module.exports = {
  indexPage: (path, response) => {
    serveStaticFile(path, response);
  },

};


function indexPage(path, response) {
  if (DEBUG) console.log(`index.html was called.`);
  displayFile(path, response);
}

function aboutPage(path, response) {
  if (DEBUG) console.log(`about.html was called.`);
  displayFile(path, response);
}

function contactPage(path, response) {
  if (DEBUG) console.log(`contact.html was called.`);
  displayFile(path, response);
}

function newsPage(path, response) {
  if (DEBUG) console.log(`news.html was called.`);
  displayFile(path, response);
}

function funfactsPage(path, response) {
  if (DEBUG) console.log(`funfacts.html was called.`);
  displayFile(path, response);
}
function errorPage(path, response) {
  if (DEBUG) console.log(`error.html was called.`);
  displayFile(path, response);
}
function pokePage(path, response) {
  if (DEBUG) console.log(`I choose you was`);
  displayFile(path, response);
}

function displayFile(path, response) {
  fs.readFile(path, function (err, data) {
    if (err) {
      console.log(err);
      response.end();
    } else {
      if (DEBUG) console.log("file successful");
      response.writeHead(response.statusCode, { "Content-Type": "text/html" });
      response.write(data);
      response.end();
    }
  });
}

module.exports = {
  indexPage,
  aboutPage,
  contactPage,
  funfactsPage,
  newsPage,
  errorPage,
  pokePage,
};
