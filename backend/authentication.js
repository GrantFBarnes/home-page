const jwt = require("jsonwebtoken");

function hasManagerSecret(json) {
  if (!json) return false;
  if (!json.manager_secret) return false;
  if (json.manager_secret !== process.env.GFB_MANAGER_SECRET) return false;
  return true;
}

function hasUserId(json) {
  if (!json) return false;
  if (!json.user_id) return false;
  return true;
}

function isAuthenticated(request, cookieName) {
  const token = request.cookies[cookieName];
  if (!token) return false;
  let verify = false;
  try {
    verify = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {}
  if (!verify) return false;
  return true;
}

function getAuthentication(request, cookieName) {
  if (isAuthenticated(request, cookieName)) {
    return request.cookies[cookieName];
  }
  return null;
}

function setAuthentication(response, cookieName, cookieValue) {
  const token = jwt.sign(cookieValue, process.env.JWT_SECRET);
  response.cookie(cookieName, token, {
    maxAge: 86400000, // 24 hours = 86400000 ms
    httpOnly: true,
  });
}

function removeAuthentication(response, cookieName) {
  response.clearCookie(cookieName);
}

module.exports.hasManagerSecret = hasManagerSecret;
module.exports.hasUserId = hasUserId;

module.exports.isAuthenticated = isAuthenticated;
module.exports.getAuthentication = getAuthentication;
module.exports.setAuthentication = setAuthentication;
module.exports.removeAuthentication = removeAuthentication;
