const express = require("express");
const router = express.Router();
const Author = require("../models/author");

//get all authors
router.get("/", async (req, res) => {
  try {
    const authors = await Author.find({});
    res.render("authors/index", { authors });
  } catch {
    res.redirect("/");
  }
});

//new author route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

//create new author
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name
  });
  try {
    const newAuthor = await author.save();
    res.redirect("authors");
  } catch {
    res.render("authors/new", {
      author,
      errorMessage: "Error creating new author"
    });
  }
});

module.exports = router;
