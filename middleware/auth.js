require("dotenv").config()
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const auth = (req, res, next) => {
  const { auth } = req.headers;
  if(!auth) return res.status(StatusCodes.UNAUTHORIZED).json({msg:"no provided token!!"});

  try {
    const verified = jwt.verify(auth, process.env.JWT_SECRET);
    if(!verified) return res.status(StatusCodes.UNAUTHORIZED).json({msg:"verified token failed!!!"});
    req.user = {...verified};
    req.token = auth;
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({msg:"doesnot autherized to access this route"});
  }
}

module.exports = auth;