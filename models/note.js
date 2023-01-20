const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title:{
    type:String,
    required:[true, "title field is required"],
  },
  date:{
    type:String,
    required:[true, "date field is required"],
  },
  desc:{
    type:String,
    required:[true, "desc field is required"],
  },
});

const noteModel = mongoose.model("note", noteSchema);

module.exports = {
  noteSchema,
  noteModel
}