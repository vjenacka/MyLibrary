const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Book = require("../models/book");
const Author = require("../models/author");
const uploadPath = path.join("public", Book.coverImageBasePath);
const imageMimeTypes= ['']
const upload = multer({
  dest: uploadPath,
  fileFilter:(req,file,callback)=>{
    callback(null,)
  }
});

//get all books
router.get("/", async (req, res) => {
  res.send("all books");
});

//new books route
router.get("/new", async (req, res) => {
  try {
    const authors = await Author.find({});
    const book = new Book();
    res.render("books/new", {
      authors,
      book
    });
  } catch {
    res.redirect("/books");
  }
});

//create new book
router.post("/", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: req.body.publishDate,
    pageCount: req.body.pageCount,
    description: req.body.description
  });
});

module.exports = router;
