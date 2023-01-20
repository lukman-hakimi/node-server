const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true,
  },
  rating:{
    type:Number,
    required:true
  }
})

const productSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, "name field is required"],
    trim:true
  },
  description:{
    type:String,
    required:[true, "description field is required"],
  },
  category:{
    type:String,
    required:[true, "category field is required"],
  },
  images:[
    {
      type:String,
      required:[true, "images field is required"]
    }
  ],
  quantity:{
    type:Number,
    required:[true, "quantity field is required"]
  },
  price:{
    type:Number,
    required:[true, "price field is required"]
  },
  rating:[ratingSchema]
});

const productModel = mongoose.model("product", productSchema);

module.exports = {productModel};