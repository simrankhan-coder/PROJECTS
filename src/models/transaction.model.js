const mongoose=require('mongoose');
const transactionSchema=new mongoose.Schema({
    Fromaccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account",
        required:true,
        index:true
    },
    Toaccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account",
        required:true,
        index:true
    },
    status:{
        type:String,
        enum:["pending","completed","failed","Reversed"],
        default:"pending"
    },
    amount:{
        type:Number,
        required:true
    },
    idempotencyKey:{
        type:String,
        required:true,
        unique:true,
        index:true
    }
},{
        timestamps:true
    });
const Transaction=mongoose.model("Transaction",transactionSchema);
module.exports=Transaction;