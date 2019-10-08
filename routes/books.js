const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const Author = require("../models/author");

//get all books
router.get("/", async (req, res) => {
  res.send("all books");
});

//new books route
router.get("/new", async (req, res) => {
  try{
    const authors= await Author.find({});
    const book= new Book();
    res.render('books/new',{
      authors,
      book
    })
  }catch{
    res.redirect('/books')
  }
});

//create new book
router.post("/", async (req, res) => {
  res.send("create book");
});

module.exports = router;
