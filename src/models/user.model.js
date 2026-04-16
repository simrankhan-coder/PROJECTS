const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:[true, "Email is required"],
        trim:true,
        lowercase:true,
       match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"],
        unique:[true, "Email already exists"]
    },
    name:{
        type:String,
        required:[true, "Name is required"],
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        minlength:[6, "Password must be at least 6 characters long"],
        select:false
    }
},
    {
        timestamps:true,
    }
);
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return ;
    }
    try{
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password, salt);
    }catch(err){
        return ;
    }
});
userSchema.methods.comparePassword=async function(password){
    return bcrypt.compare(password, this.password);
};
const userModel=mongoose.model("User", userSchema);
module.exports=userModel;