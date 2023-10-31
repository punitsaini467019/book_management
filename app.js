require("dotenv").config()

let express = require("express")
let app  = express()
let { DB_Connection } = require("./src/dbConn/dbconnection")
DB_Connection()  // Database Connection Call Function

const { API_PREFIX } = process.env
app.use(express.json())

app.use(API_PREFIX, require("./src/routes/route"))
app.use((req, res, _) => {
	res.status(404).json({ status:false, type: 'error', message: 'the url you are trying to reach is not hosted on our server' });
});

module.exports = app;

