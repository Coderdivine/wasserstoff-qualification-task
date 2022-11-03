const express = require("express");
require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json()) //code accepts json requests
app.use(express.urlencoded({ extended: true }));
const URI = 'mongodb+srv://chimdi:chimdindu2@cluster0.5zspaed.mongodb.net/?retryWrites=true&w=majority' || process.env.AUTH_URI || 'mongodb://localhost:27017/users';
//The URI is may personal URI. It's public 
mongoose.connect(URI);
const port = process.env.PORT || 1369;
require("./DBConnection"); // this codes connect to mongodb database 
const User = require("./User");
const Blog = require("./Blog");
app.use("/blog",Blog);// accept any request from this endpoint "/blog"
app.use("/user",User);// accept any request from this endpoint "/user"


app.listen(port, () => {
  // the code below shows show the server URL in the console 
 console.log(`My Server is working on [ http://localhost:${port} ] `);
}) 
