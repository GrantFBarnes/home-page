const express = require("express");

const authentication = require("./authentication.js");

const managerCookieName = "gfb_manager_token";
const userCookieName = "gfb_user_token";

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

// Heartbeat to make sure server is running
router.get("/api/heartbeat", (request, response) => {
  returnSuccess(response, null);
});

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

// Get user authentication
router.get("/api/authentication/user", (request, response) => {
  const id = authentication.getAuthentication(request, userCookieName);
  if (id) {
    returnSuccess(response, id);
  } else {
    rejectUnauthenticated(response, userCookieName);
  }
});

// Set user authentication
router.post("/api/authentication/user", (request, response) => {
  if (authentication.hasUserId(request.body)) {
    const user_id = request.body.user_id;
    authentication.setAuthentication(response, userCookieName, user_id);
    returnSuccess(response, user_id);
  } else {
    rejectUnauthenticated(response, userCookieName);
  }
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

module.exports = router;
