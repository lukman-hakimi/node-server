const { model } = require("mongoose");
const {noteModel} = require("./models/note");
const notes = [
  {
    title:"fisrt note",
    date: "20",
    desc:"Lorem ipsum dolor sit amet, consectetur adipiscing eli"
  },
  {
    title:"second note",
    date: "20",
    desc:"Lorem ipsum dolor sit amet, consectetur adipiscing eli"
  },
  {
    title:"Third note",
    date: "20",
    desc:"Lorem ipsum dolor sit amet, consectetur adipiscing eli"
  },
  {
    title:"Fourth note",
    date: "20",
    desc:"Lorem ipsum dolor sit amet, consectetur adipiscing eli"
  },
  {
    title:"Next",
    date: "20",
    desc:"Lorem ipsum dolor sit amet, consectetur adipiscing eli"
  }

]

// const insert = async () => {
//   try {
//     const data = await noteModel.create(notes);
//   } catch (error) {
//     console.log(error);
//   }
// }

// insert()

module.exports = notes