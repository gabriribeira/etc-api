const jsend = require("jsend");
const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const token = req.header("Authorization").split(' ')[1];
  if (!token) return res.status(401).json(jsend.error("Access denied"));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json(jsend.error("Invalid token"));
  }
}

module.exports = verifyToken;
