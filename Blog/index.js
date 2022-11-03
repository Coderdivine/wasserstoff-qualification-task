const express = require("express");
const cors = require("cors");
const router = express.Router();
const uuid = require("uuid");
const {Export_BlogSchema,Export_UserSchema} = require("../Model");
const {ScoreColor,NewPercentage,UpdateAnArray} = require("../Utilities");
const {Header} = require("../Authentication");

router.post("/post-blog",async(req,res)=>{
    try{ 
        const {author,title,author_id,post} = req.body;
        if(author.length < 4){res.status(404).json({message:"Author name is not valid"}).end()}
        if(title.length < 9){res.status(404).json({message:"Title most be greater than 9 words"}).end()}
        if(author_id.length < 10){res.status(404).json({message:"Author ID undefined"}).end()}
        if(typeof post == "string"){
            const post_to_json = JSON.parse(post);
            if(post_to_json.length > 3){
                const ide = uuid.v4();
                const percentage = await NewPercentage(post_to_json);
                const AddPost = new Export_BlogSchema({
                    author,title,ide,post,percentage
                });
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
    try{
        const user_id = req.body.user_id;
        const posts = await Export_BlogSchema.find({author_id:user_id});
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
    try{
        const blog_id = req.body.id;
        const posts = await Export_BlogSchema.find({ide:blog_id});
        res.status(200).json({
            message:"User post found",
            posts:posts[0]
        }).end();
    }catch(error){
        res.status(500).json({
            message:error.message
        }).end();
    }
})
router.post("/evaluate-post",async(req,res)=>{
  try{ 
     const {blog_id,item_id,score} = req.body;
     const Blog = await Export_BlogSchema.find({ide:blog_id});
     if(Blog.length){
        const post_to_json = JSON.parse(Blog[0].post);
        const item = post_to_json[Number(item_id)]
        const text = item.text;
        const color = await ScoreColor(score)
        const new_item = {score,color,text,item_id};
        //Update item with new item...
        const newArray = await UpdateAnArray(new_item,post_to_json,Number(item_id))
        const post = JSON.stringify(newArray);
        console.log({newArray});
        const percentage = await NewPercentage(newArray);
        console.log({percentage})
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
    try{
        const {post,blog_id} = req.body;
        if(typeof post == "string"){res.status(404).json({message:"New Post is not a string"}).end()};
        if(blog_id.length > 4){res.status(404).json({message:"New Post is not a string"}).end()}
        const update = await Export_BlogSchema.updateOne({ ide:blog_id }, { post });
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