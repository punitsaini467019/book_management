let express = require("express")
let router = express.Router()

let { addBook, getAllBook, getOneBook, updateBookData, deleteBookData } = require("../controller/book_management")
const validate = require("../utils/validate")
const {addBookVal,updateBookVal} = require("../validators/validator")

router.post("/addbook", validate(addBookVal),addBook)   // add book into database

router.get("/getallbook",getAllBook)    // get all book details from database

router.get("/getonebook",getOneBook)      // get one book details from database

router.put("/updatebook", validate(updateBookVal), updateBookData)    // update book data in database

router.delete("/deletebook", deleteBookData) // delete book from database

module.exports = router