const express = require("express");
const cors = require("cors");
const uuid = require("uuid")
const router = express.Router();
const {Header} = require("../Authentication");
const {Export_UserSchema} = require("../Model");

router.post("/authenticate-user",async(req,res)=>{
    try{ 
        const {username} = req.body;
        const is_username = await Export_UserSchema.find({username});
        if(username.length > 4 && is_username){
            if(is_username.length){
                res.status(200).json({
                    message:"User Logged In",
                    enum:"@user",
                    user_details:{
                        username:is_username[0].username,
                        ide:is_username[0].ide}
                })
            }else{
                const ide = uuid.v4();
             const AddUser = new Export_UserSchema({
                username,ide
             })
             AddUser.save().then(result=>{
                res.status(201).json({
                    message:"New User addd",
                    user:"@new_user",
                    user_details:{
                        username,ide
                    }
                     
                }).end()
            }).catch(err=>{
                res.json({
                    message:err.message
                }).end()
            })
            }
            
        }else{
            res.status(400).json({
                message:"Please username must be greater than four"
            })
        }
    }catch(error){
        res.status(500).json({
            message:`Something went wrong: ${error.message}`
        }).end();
    }
})

module.exports = router;