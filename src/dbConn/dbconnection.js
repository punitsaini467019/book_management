let mongoose = require("mongoose")
let MongoDB_URL = process.env.MONGODB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/book_management"
exports.DB_Connection = () => { 
    mongoose.connect(`${MongoDB_URL}`).then(() => { 
      console.log("Database Connection established")
    }).catch((error) => {
        console.log(`Error - DB connection failed ${error}`)
    })
}
