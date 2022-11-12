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

// Check manager authentication
router.get("/api/authentication/manager", (request, response) => {
  if (authentication.isAuthenticated(request, managerCookieName)) {
    returnSuccess(response, null);
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

// Check user authentication
router.get("/api/authentication/user", (request, response) => {
  const user_id = authentication.getAuthentication(request, userCookieName);
  if (user_id) {
    returnSuccess(response, user_id);
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
