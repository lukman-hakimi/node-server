require("dotenv").config();
const {userModal} = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const {email, name, password} = req.body
  try {
    const existingEmail = await userModal.findOne({email: email});

    if(existingEmail) return res.status(StatusCodes.BAD_REQUEST).json({msg:"this email already used!!"});

    const data = await userModal.create({name, email, password});
    if(!data) res.status(StatusCodes.BAD_REQUEST).json({msg: "please make sure your data!!!"});

    res.status(StatusCodes.OK).json({msg: data});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error.message});
  }
}

const login = async(req, res) => {
  const { email, password } = req.body;
  try {
    const data = await userModal.findOne({email});
    if(!data) return res.status(StatusCodes.BAD_REQUEST).json({msg:"this user doesn't exist!!"});

    const isMatch = await bcrypt.compare(password, data.password);

    if(!isMatch) return res.status(StatusCodes.BAD_REQUEST).json({msg:"Incorrect password!!"});

    const token = jwt.sign({id: data._id, email:data.email}, process.env.JWT_SECRET);

    res.status(StatusCodes.OK).json({token, ...data._doc});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message});
  }
} 

const isToken = async (req, res) =>{
  const { auth } = req.headers;
  if(!auth) return res.status(404).json({msg:false});

  const verified = jwt.verify(auth, process.env.JWT_SECRET);
  if(!verified) return res.status(404).json({msg:false});

  const user = await userModal.findById(verified.id);
  if(!user) return res.status(404).json({msg:false});

  res.status(StatusCodes.OK).json({msg:true});
}

const getUserData = async (req, res) => {
  const { token, user } = req;

  try {
    const userData = await userModal.findOne({_id:user.id});
    console.log(userData);
    res.status(StatusCodes.OK).json({token, ...userData._doc});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message});
  }
}




module.exports = {
  register,
  login,
  isToken,
  getUserData,
}