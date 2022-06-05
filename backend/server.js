////////////////////////////////////////////////////////////////////////////////
// Import NPM Dependencies
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const http = require("http");
const https = require("https");
const ossc = require("openssl-self-signed-certificate");
const parser = require("body-parser");
const session = require("express-session");

////////////////////////////////////////////////////////////////////////////////
// Define potential Single Page Applications

// Must be defined at the same level as home-page
const repo_path = __dirname + "/../../";
const potentialApps = {
  pulling: {
    build_path: repo_path + "tractor-pulling/dist/tractor-pulling",
    backend_path: repo_path + "tractor-pulling/backend",
  },
  vietnamese: {
    build_path: repo_path + "learn-vietnamese/dist/learn-vietnamese",
    backend_path: repo_path + "learn-vietnamese/backend",
  },
  voc: {
    build_path:
      repo_path + "vehicle-ownership-cost/dist/vehicle-ownership-cost",
  },
};

// Check to see which potential SPAs are available
let apps = {};
for (let a in potentialApps) {
  if (fs.existsSync(potentialApps[a].build_path)) {
    apps[a] = potentialApps[a];
  }
}

////////////////////////////////////////////////////////////////////////////////
// Define server

const app = express();
app.use(cors({ credentials: true, origin: true }));

////////////////////////////////////////////////////////////////////////////////
// Define paths for home-page site

const html_path = __dirname + "/../html";
app.get("/", function (request, response) {
  response.sendFile("index.html", { root: html_path });
});

app.get("/projects", function (request, response) {
  response.sendFile("projects.html", { root: html_path });
});

app.get("/social", function (request, response) {
  response.sendFile("social.html", { root: html_path });
});

////////////////////////////////////////////////////////////////////////////////
// Define settings of server

for (let a in apps) {
  app.use(express.static(apps[a].build_path));
}

app.use(parser.json({ limit: "50mb" }));
app.use(cookieParser());

app.use(require("./api"));
for (let a in apps) {
  if (fs.existsSync(apps[a].backend_path)) {
    app.use(require(apps[a].backend_path + "/api"));
  }
}

for (let a in apps) {
  app.use(
    session({
      name: a,
      secret: a + "-secret",
      resave: false,
      saveUninitialized: false,
    })
  );
}

app.use(parser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

////////////////////////////////////////////////////////////////////////////////
// Handle all requests that were not already handled by APIs or home page

app.get("*", function (request, response) {
  // Check if request is for a static file
  if (request.url.startsWith("/static")) {
    response.sendFile(request.url, { root: __dirname + "/../" });
    return;
  }

  // Check if request is for any SPA
  for (let a in apps) {
    if (request.url.indexOf(a) >= 0) {
      // Return SPA build files
      response.sendFile("index.html", { root: apps[a].build_path });
      return;
    }
  }

  // Unknown request, return error
  response.sendFile("error.html", { root: html_path });
});

////////////////////////////////////////////////////////////////////////////////
// Start up server

function main() {
  const server = http.createServer(app);
  if (process.env.GFB_HOSTING_ENV === "prod") {
    server.listen(80);
    https
      .createServer(
        { key: ossc.key, cert: ossc.cert, rejectUnauthorized: false },
        app
      )
      .listen(443);
  } else {
    server.listen(8080);
    console.log("Running local environment on http://localhost:8080");
  }
}

main();
