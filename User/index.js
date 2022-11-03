const express = require("express");
const cors = require("cors");
const uuid = require("uuid")
const router = express.Router();
const {Header} = require("../Authentication");
const {Export_UserSchema} = require("../Model");

router.post("/authenticate-user",async(req,res)=>{
          /*This function check if a user exists or not.
            If a user exists, we would return the user details 
            Else we create a new user with the username
          */
    try{ 
        const {username} = req.body;
        const is_username = await Export_UserSchema.find({username});//search of user in database 
        if(username.length > 4 && is_username){
        //check if username entered exists and is greater than four...
            if(is_username.length){
              //if response has length that means the user exists
                res.status(200).json({
                    message:"User Logged In",
                    enum:"@user",
                    user_details:{
                        username:is_username[0].username,
                        ide:is_username[0].ide}
                })
            }else{
                //else we would create a user with the username entered 
                const ide = uuid.v4();//we use v4 function to generate random string 
             const AddUser = new Export_UserSchema({
                username,ide
             })
            //To store AddUser to the database, I called the save function 
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

module.exports = router;//exported router (This process is required by express)
