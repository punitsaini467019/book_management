let { bookModel } = require("../model")

exports.addBook = async (req, res) => { 
    try {
    let { title, author, summary } = req.body
    let data = new bookModel({
        title: title,
        author: author,
        summary: summary
    })
    await data.save()
    res.send({
        status: 200,
        message: "Add Book successfully",
        data:data
    })
    } catch (err) {
        console.log(err)
    }
}

exports.getAllBook = async (req,res) => {
    try {
    let data = await bookModel.find()
    if (data.length > 0) { 
        res.send({
            status: 200,
            message: "Get all books successfully",
            data:data
        })
    } else {
        res.send({
            status: 400,
            message: "Book not found",
            data:data
        })
    }
    } catch (err) {
        console.log(err)
    }
}

exports.getOneBook = async (req,res) => {
    try {
        let { id } = req.query
        let getbook = await bookModel.findOne({ _id: id })
        if (getbook) {
            res.send({
                status: 200,
                message: "Book Data Fatch Successfully",
                data:getbook
            })
        } else {
            res.send({
                status: 400,
                message: "book data not found",
                data:getbook
            })
        }
    } catch (err) {
        console.log(err)
    }
}

exports.updateBookData = async (req,res) => {
    try {
        let { id } = req.body
        let data = await bookModel.findOne({ _id: id })
        if (!data) {
            res.send({
                status: 400,
                message: "Book not found",
                data:{}
            })
        }
        let updatebook = await bookModel.findOneAndUpdate({ _id: id },req.body, { new: true })
        if (updatebook) {
            res.send({
                status: 200,
                message: "Book updated successfully",
                data: updatebook
            })
        }
    } catch (err) {
        console.log(err)
    }
}


exports.deleteBookData = async (req,res) => {
    try {
        let { id } = req.query
        let data = await bookModel.findOne({ _id: id })
        if (!data) {
            res.send({
                status: 400,
                message: "Book not found",
                data:{}
            })
        }
        let deletebook = await bookModel.findOneAndDelete({ _id: id })
        if (deletebook) {
            res.send({
                statsu: 200,
                message: "Book deleted successfully",
                data:deletebook
            })
        }
    } catch (err) {
        console.log(err)
    }
}