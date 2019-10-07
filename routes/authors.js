const express = require("express");
const router = express.Router();
const Author = require("../models/author");

//get all authors
router.get("/", (req, res) => {
  res.render("authors/index");
});

//new author route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

//create new author
router.post("/", (req, res) => {
  res.send("Created");
});

module.exports = router;
