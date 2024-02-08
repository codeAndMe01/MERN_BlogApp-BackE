const User = require("../models/User");
const bcryptjs = require('bcryptjs')


const getAllUser = async(req,res)=>{
   let users;

   try {
     
    users = await User.find()

   } catch (error) {
    return console.log("Error Occured",error)
   }

   if(!users){
    return res.status(400).json({message: "No User found"})
   }

   res.status(200).json({users})

}


const signupUser = async(req,res)=>{
    const {name,email,password} = req.body;

    let existingUser = await User.findOne({email})
    
    if(existingUser){
       return res.status(400).json({message: "Email already exits"})
    }
     
    let hashedPassword = bcryptjs.hashSync(password)

    let users = new User({
        name,
        email,
        password: hashedPassword,
        blogs:[]
    })

    try {
        await users.save()
    } catch (error) {
       return console.log("Not able to save User" , error)
    }
   
    res.status(201).json({users})
}

const loginUser = async(req,res)=>{
    
    const {email,password} = req.body;

    let existingUser = await User.findOne({email})
    
    if(!existingUser){
       return res.status(400).json({message: "User doesn't exits"})
    }

    const passwordMatched = bcryptjs.compareSync(password,existingUser.password) //return bolean value
     
    if(!passwordMatched){
        res.status(400).json({message: "Incorrect Password"})
    }

    res.status(200).json({message:"Login Successfully","user":existingUser})
 
}

module.exports  = {getAllUser,signupUser,loginUser};