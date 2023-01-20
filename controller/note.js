const notes = require("../notes");
const { noteModel } = require("../models/note");

const getAllNotes = async (req, res,) => {
  try {
    const data = await noteModel.find({});

    if(!data) res.status(404).json({msg: "opps!! data not found"});

    res.status(200).json({data:notes});
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllNotes
};