const express=require('express');
const authController=require("../controllers/auth.controller");
const Router=express.Router();

/*Api: POST /api/auth/register */
Router.post("/register",authController.registerUser);

/*Api: Post /api/auth/login */
Router.post("/login", authController.loginUser);


module.exports=Router;