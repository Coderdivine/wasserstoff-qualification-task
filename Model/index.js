const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    ide:String,
    joined:{
        type:Date,
        default:Date.now()
    }
});

const BlogSchema = new Schema({
    author:{
        type:String,
        required:true
    },
    author_id:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    ide:String,
    post:{
        type:String,
        required:true
    },
    posted:{
        type:Date,
        default:Date.now()
    },
    percentage:{
        type:String,
        required:false
    }
})

const Export_UserSchema = mongoose.model("UserSchemaWasserstoff",UserSchema);
const Export_BlogSchema = mongoose.model("BlogSchemaWasserstoff",BlogSchema);
module.exports = {Export_UserSchema,Export_BlogSchema};