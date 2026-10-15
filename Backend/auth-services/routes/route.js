const express = require("express");
const Route = express.Router();
const multerMiddleware = require("../middlewares/multer.middleware");

Route.get("/health", (req, res) => {
  res.status(201).json({
    message: "health route",
  });
});

// multer file uplaod
Route.post("/upload", multerMiddleware.single("file"), (req, res) => {
  console.log(req.file);
  return res.status(200).json({
    message: "file upload successfull !",
    file: req.file,
  });
});

module.exports = Route;
