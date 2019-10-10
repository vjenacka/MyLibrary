const express = require("express");
const router = express.Router();
//library for manipulating uploaded files
const multer = require("multer");
const path = require("path");
const Book = require("../models/book");
const Author = require("../models/author");
const uploadPath = path.join("public", Book.coverImageBasePath);
const imageMimeTypes = ["images/jpg", "images/png", "images/gif"];
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  }
});

//get all books
router.get("/", async (req, res) => {
  res.send("all books");
});

//new books route
router.get("/new", async (req, res) => {
  renderNewPage(res, new Book())
});

//create new book
router.post("/", upload.single("cover"), async (req, res) => {
  const fileName = req.file != null ? req.file.name : null;
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: req.body.publishDate,
    pageCount: req.body.pageCount,
    coverImage: fileName,
    description: req.body.description
  });

  try {
    const newBook = await book.save();
    res.redirect("books");
  } catch {
    renderNewPage(res,book, true)
  }
});

//function soo we don't repeat the same code
function renderNewPage(res, book, hasError = false) {
  try {
    const authors = await Author.find({});
    const params= {
      authors,
      book
    }
    if(hasError) params.errorMessage='Error Creating Book'
    res.render("books/new", params);
  } catch {
    res.redirect("/books");
  }
}

module.exports = router;
