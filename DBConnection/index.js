const mongoose = require("mongoose");
const db = mongoose.connection // instantiate a mongodb connection using mongoose(a mongodb library)
db.on("error",(err)=>{console.log(err)})
db.once("open",()=> console.log("Connected to database"))
