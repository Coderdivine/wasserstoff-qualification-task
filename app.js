const express = require("express");
require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const URI = 'mongodb+srv://chimdi:chimdindu2@stanrutecms.qwwju.mongodb.net/?retryWrites=true&w=majority' || process.env.AUTH_URI || 'mongodb://localhost:27017/users';
mongoose.connect(URI);
const port = process.env.PORT || 1369;
require("./DBConnection");
const User = require("./User");
const Blog = require("./Blog");
app.use("/admin",User);
app.use("/user",Blog);


app.listen(port, () => {
 console.log(`My Server is working on [ http://localhost:${port} ] `);
}) 