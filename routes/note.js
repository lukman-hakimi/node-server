const express = require("express");
const route = express.Router();
const {getAllNotes} = require("../controller/note")

route.get("/notes", getAllNotes);

module.exports = route;