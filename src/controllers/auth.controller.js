const userModel=require("../models/user.model");
jwt=require("jsonwebtoken");
const emailService=require("../services/email.service");

/*
user registration controller
Api: POST /api/auth/register
*/
async function registerUser(req, res){
    const {email, name, password}=req.body;
    if(!email || !name || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    const isExists=await userModel.findOne({
        email:email.toLowerCase()

    })
    if(isExists){
        return res.status(422).json({message:"Email already exists", status:"failed"});
    }
    const newUser=await userModel.create({
        email,
        name,
        password
    });
    const token=jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {expiresIn:"1d"});
    res.cookie("token", token)
    res.status(201).json({
        user:{
            id:newUser._id,
            email:newUser.email,
            name:newUser.name
        },
        token,
        message:"User registered successfully", status:"success"});
    await emailService.sendRegistrationEmail(newUser.email, newUser.name);

}
/*Api: Post /api/auth/login */
async function loginUser(req, res){
    const {email, password}=req.body;
    const user=await userModel.findOne({email:email.toLowerCase().trim()}).select("+password");
    if(!user){
        return res.status(401).json({message:"Invalid email or password", status:"failed"});
    }
    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password", status:"failed"});
    }
    const token=jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"1d"});
     res.cookie("token", token)
    res.status(200).json({
        user:{
            id:user._id,
            email:user.email,
            name:user.name
        },
        token,
        message:"User logged in successfully", status:"success"});

}

/**
 * - User Logout Controller
 * - POST /api/auth/logout
  */
async function userLogoutController(req, res) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if (!token) {
        return res.status(200).json({
            message: "User logged out successfully"
        })
    }



    await tokenBlackListModel.create({
        token: token
    })

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })

}

module.exports={registerUser, loginUser, userLogoutController};
