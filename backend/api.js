const express = require("express");

const authentication = require("./authentication.js");

const managerCookieName = "gfb_manager_token";

const router = express.Router();

function returnSuccess(response, id) {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.write(JSON.stringify({ status: "ok", id: id }));
  response.end();
}

function rejectUnauthenticated(response, cookieName) {
  authentication.removeAuthentication(response, cookieName);
  response.writeHead(401, { "Content-Type": "application/json" });
  response.write(JSON.stringify({ status: "not authenticated" }));
  response.end();
}

////////////////////////////////////////////////////////////////////////////////
// Define APIs

// Get manager authentication
router.get("/api/authentication/manager", (request, response) => {
  const id = authentication.getAuthentication(request, managerCookieName);
  if (id) {
    returnSuccess(response, id);
  } else {
    rejectUnauthenticated(response, managerCookieName);
  }
});

// Set manager authentication
router.post("/api/authentication/manager", (request, response) => {
  if (authentication.hasManagerSecret(request.body)) {
    authentication.setAuthentication(response, managerCookieName, "manager");
    returnSuccess(response, null);
  } else {
    rejectUnauthenticated(response, managerCookieName);
  }
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

module.exports = router;
