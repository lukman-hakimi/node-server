require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const {userModal} = require("../models/user");

const admin = async (req, res, next) => {
  const {auth} = req.headers;
  if(!auth) return res.status(StatusCodes.UNAUTHORIZED).json({msg:"access deniad!!"});

  const verifiedToken = jwt.verify(auth, process.env.JWT_SECRET);
  if(!verifiedToken) return res.status(StatusCodes.UNAUTHORIZED).json({msg:"access deniad!!"});

  try {
    const data = await userModal.findOne({_id:verifiedToken.id});
    if(!data) return res.status(StatusCodes.UNAUTHORIZED).json({msg:"access deniad!!"});

    if(data.type === "admin"){
      req.user = verifiedToken;
      req.token = auth;
      next();
    }
    else{
      res.status(StatusCodes.UNAUTHORIZED).json({msg:"access deniad"});
    }
    
  } catch (error) {
   res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message});
  }
}

module.exports = admin;