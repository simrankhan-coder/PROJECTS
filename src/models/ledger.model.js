const mongoose=require('mongoose');
const Transaction = require('./transaction.model');
 
const ledgerSchema=new mongoose.Schema({
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account",
        required:true,
        index:true,
        immutable:true
    },
    amount:{
        type:Number,
        required:true,
        immutable:true
    },
    transaction:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Transaction",
        required:true,
        index:true,
        immutable:true
    },
    type:{
        type:String,
        enum:{values:["debit","credit"], message:"Invalid ledger type"},
        required:true,
        immutable:true
    }
});
function Preventledgerentries(next) {
    throw new Error("Ledger entries cannot be modified or deleted");
}
ledgerSchema.pre('findOneAndUpdate', Preventledgerentries);
ledgerSchema.pre('findOneAndDelete', Preventledgerentries);
ledgerSchema.pre('findOneAndReplace', Preventledgerentries);
ledgerSchema.pre('findOneAndRemove', Preventledgerentries);
ledgerSchema.pre('deleteOne', Preventledgerentries);
ledgerSchema.pre('deleteMany', Preventledgerentries);
ledgerSchema.pre('updateOne', Preventledgerentries);
ledgerSchema.pre('updateMany', Preventledgerentries);
ledgerSchema.pre('remove', Preventledgerentries);

const Ledger=mongoose.model("Ledger",ledgerSchema);
module.exports=Ledger;