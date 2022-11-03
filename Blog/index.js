const express = require("express");
const cors = require("cors");
const router = express.Router();//require Router function from express
const uuid = require("uuid");//import uuid to generate random numbers
const {Export_BlogSchema,Export_UserSchema} = require("../Model");//we required the exported model
const {ScoreColor,NewPercentage,UpdateAnArray} = require("../Utilities");//required the exported functions from Utlis...
const {Header} = require("../Authentication");//Not required here

router.post("/post-blog",async(req,res)=>{
     /*
     This route allows a valid user post a blog.
     By default the understanding rate of each break point specified in task is 4. This will make the understanding level 100%
      */
    try{ 
        const {author,title,author_id,post} = req.body;//destruct request and assign them as a constant variable 
        if(author.length < 4){res.status(404).json({message:"Author name is not valid"}).end()}//backend validation for author field 
        if(title.length < 9){res.status(404).json({message:"Title most be greater than 9 words"}).end()}//backend validation for Post title
        if(author_id.length < 10){res.status(404).json({message:"Author ID undefined"}).end()}//validating author_id same as User identity 
        if(typeof post == "string"){// I checked if the typeof post is a string 
            const post_to_json = JSON.parse(post);//I changed it to json format using the built-in JavaScript function 
            if(post_to_json.length > 3){// if the post length is greater than 3 that means it's a valid post
                const ide = uuid.v4();//generated a random string using the v4 function 
                const percentage = await NewPercentage(post_to_json);//calculate new percentage Ref:(../Utilities) to explanation 
                const AddPost = new Export_BlogSchema({
                    author,title,ide,post,percentage
                });
                //The Addpost is a temporary state. We will call the inbuilt save function in mongoose to store it on the database. 
                AddPost.save().then(()=>{
                    res.status(201).json({
                        message:"Post Added"
                    })
                }).catch(err=>{
                    res.json({message:err.message})
                })
            }
        }else{
            res.status(404).json({message:"Post submitted is not a string"})
        }
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
})
router.post("/user-posts",async(req,res)=>{
     //This function gets all user post and accepts only one parameter 
     //A post method is more secured than a get method that's why I decided to use it.
    try{
        const user_id = req.body.user_id;
        const posts = await Export_BlogSchema.find({author_id:user_id});//Get all user Blog...
        res.status(200).json({
            message:"User post found",
            posts
        }).end();
    }catch(error){
        res.status(500).json({
            message:error.message
        }).end();
    }
})
router.post("/a-blog",async(req,res)=>{
     // this function gets a particular Blog details. 
    try{
        const blog_id = req.body.id;
        const posts = await Export_BlogSchema.find({ide:blog_id});//Function check for details 
        res.status(200).json({
            message:"User post found",
            posts:posts[0]//we only selected the first value of the array returned 
        }).end();
    }catch(error){
        res.status(500).json({
            message:error.message
        }).end();
    }
})
router.post("/evaluate-post",async(req,res)=>{
//this function is used to evaluate/upadte specific breakout points in a sentence.
//types of break out ()/\|}{[],'.
  try{ 
     const {blog_id,item_id,score} = req.body;
     console.log({item_id})
     const Blog = await Export_BlogSchema.find({ide:blog_id});// function search for blog
     if(Blog.length){
        const post_to_json = JSON.parse(Blog[0].post);//convert the stringify json to json
        console.log({post_to_json})
        const item = post_to_json[Number(item_id)]//Find the item in json
        console.log({item})
        const text = item.text;
        const color = await ScoreColor(score)// update color by score Ref:(../Utilities) for code explanation 
        const new_item = {score,color,text,item_id}; // store new item in one state
        //Update item with new item...
        const newArray = await UpdateAnArray(new_item,post_to_json,Number(item_id)) //Ref:(../Utilities)
        const post = JSON.stringify(newArray);
        console.log({newArray});
        const percentage = await NewPercentage(newArray);// Ref:(../Utilities) for code explanation 
        console.log({percentage})// view new percentage 
        const update_post = await Export_BlogSchema.updateOne({ ide:blog_id }, { post });
        const update_percent = await Export_BlogSchema.updateOne({ ide:blog_id }, { percentage });
        if(update_post && update_percent){
            res.status(201).json({
                message:"Post updated"
            });
        }else{
            console.log(update);
            res.json({
                message:"An error occured while updating"
            })
        }
     }else{
        res.status(404).json({
            message:"Blog not found"
        })
     }
  }catch(error){
     res.status(500).json({
        message:error.message
     }).end();
  }
});
router.post("/update-post",async(req,res)=>{
    // This function wasn't required in the task but it's useful.
    try{
        const {post,blog_id} = req.body;
        if(typeof post == "string"){res.status(404).json({message:"New Post is not a string"}).end()};//check the post type
        if(blog_id.length > 4){res.status(404).json({message:"New Post is not a string"}).end()}//Validate Blog identity 
        const update = await Export_BlogSchema.updateOne({ ide:blog_id }, { post });//Upadte new post
        if(update){
            res.status(201).json({
                message:"Post updated"
            });
        }else{
            console.log(update);
            res.json({
                message:"An error occured while updating"
            })
        }
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})

module.exports = router;
