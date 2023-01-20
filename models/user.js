const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, "name field is required"],
    trim:true
  },
  email:{
    type:String,
    required:[true, "email field is required"],
    trim:true,
    match:[
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please enter valid email addres"
    ],
    unique:true
  },
  password:{
    type:String,
    required:[true, "password field is required"],
    minLength:4,
  },
  type:{
    type:String,
    default:"user"
  }
})

userSchema.pre("save", async function(next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

const userModal = mongoose.model("user", userSchema);

module.exports = {
  userModal,
  userSchema
}