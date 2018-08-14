const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BooksSchema = new Schema({
    title:String,
    author:String,
    category:String
});
module.exports = mongoose.model('books',BooksSchema);