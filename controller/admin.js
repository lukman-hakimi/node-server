const { productModel } = require("../models/products");
const {StatusCodes} = require("http-status-codes");
const e = require("express");

const createProducts = async (req, res) => {
  const { name, description, images, quantity, price, category } = req.body;
  try {
    const data = await productModel.create({
      name,
      images,
      category,
      description,
      quantity,
      price,
    });
    if (!data) return res.status(StatusCodes.BAD_REQUEST).json({msg:"please provide product info."});

    res.status(StatusCodes.OK).json({data});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message});
  }
};

const getAllProducts = async (req, res) => {
  try {
    const data = await productModel.find({});
    if(!data) return res.status(StatusCodes.BAD_REQUEST).json({msg: "data not found!!"});

    res.status(StatusCodes.OK).json({data});
    
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message});
  }
}



const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const data = await productModel.findOneAndDelete({_id: productId});
    if(!data) return res.status(StatusCodes.BAD_REQUEST).json({msg:"please provide correct identifier!!"});

    res.status(StatusCodes.OK).json({msg:"deleted"});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message});
  }

}

module.exports = {
  createProducts,
  getAllProducts,
  deleteProduct
}
