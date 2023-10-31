let {Schema,model} = require("mongoose")

let BookSchema = Schema({
    title: {
        type: String,
        default:""
    },
    author: {
        type: String,
        default:""
    },
    summary: {
        type: String,
        default:""
    }
},{timestamps: true, versionKey: false})

module.exports = model("book_management",BookSchema)