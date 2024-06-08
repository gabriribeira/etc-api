const jsend = require("jsend");
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.header("Authorization");
  
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json(jsend.error("Access denied"));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      return next();
    } catch (error) {
      return res.status(401).json(jsend.error("Invalid token"));
    }
  }

  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json(jsend.error("Access denied"));
}

module.exports = { verifyToken };