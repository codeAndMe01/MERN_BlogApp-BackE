const { default: mongoose } = require('mongoose');
const Blog = require('../models/Blog');
const User = require('../models/User');
const { findByIdAndDelete } = require('../models/User');

const getAllBlogs = async(req,res)=>{
     
    let blogs; 

    try {
        blogs = await Blog.find().populate('user');
    } catch (error) {
        console.log(error)
    }

    if(!blogs){
        return res.status(400).json({message:"Blog not found"})
    }
   
    return res.status(200).json({blogs})

}

const addBlog = async(req,res)=>{
    
    const {title,description,image,user} = req.body;

    console.log(" User",user)
    let existingUser;
    
    try {
        existingUser = await User.findById(user);   //user contains the id of particular user as i passed in Schema 
    } catch (error) {
        console.log("User not find ","error")
    }
    
    console.log(" existingUser",existingUser)
    
    if(!existingUser){
        res.status(400).json({message: "Unable to find User of this ID"})
    }

    let newBlog = new Blog({
        title,
        description,
        image,
        user
    })

    
    try {
         const session = await mongoose.startSession();
         session.startTransaction();
         await newBlog.save({session})
         console.log(newBlog)
        
         existingUser.blogs.push(newBlog);
         await existingUser.save({session})

         await session.commitTransaction();
    } catch (error) {
       console.log("Somthing went wrong" ,error)
       return res.status(500).json({message: error})

    }

    return res.status(200).json({newBlog})

}


const updateblog = async(req,res)=>{
    const {title,description} = req.body
     
    const blogId = req.params.id;
   
    let updatedBlog;
    try {
        updatedBlog = await Blog.findByIdAndUpdate(blogId , {title,description})
        
    } catch (error) {
        console.log("blog update error","error");
    }

    if(!updateblog){
        res.status(500).json({message : "Unable to update Blog"})
    } 

     res.status(200).json({message : updatedBlog})

}


const getblog = async(req,res)=>{
  const blogId = req.params.id

  let blog;

  try {
    blog = await Blog.findById(blogId);
  } catch (error) {
    console.log("Blog not found ",error)
  }

  if(!blog){
    res.status(500).json({message : "Cannot get your blog"})
  }

  res.status(200).json({blog})

}

const deleteblog = async(req,res)=>{
   const blogId = req.params.id;

   let deletedBlog =  await Blog.findByIdAndDelete(blogId).populate('user');
                       console.log(deletedBlog.user)

                       await deletedBlog.user.blogs.pull(deletedBlog)
                       await deletedBlog.user.save()

   if(!deletedBlog){
    res.status(500).json({message: "Something went wrong try again"})
   }

    res.status(200).json({message : "Blog is deleted permanently"})
}



const getByUserId = async(req,res)=>{
   const userId = req.params.id;

   let currentUser;

   try {
    currentUser = await User.findById(userId).populate('blogs')
   } catch (error) {
    console.log("current User error",error)
   }

   if(!currentUser){
    res.status(400).json({message: "Cannot get the particular User "});
   }

   res.status(200).json({user : currentUser })
}

module.exports = {getAllBlogs,addBlog,updateblog,getblog,deleteblog,getByUserId}