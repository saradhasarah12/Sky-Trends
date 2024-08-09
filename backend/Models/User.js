const mongoose = require("mongoose")

const UserDetailesSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    password : {
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true
    } 
},
{collation:"UserInfo",});
const User = mongoose.model("UserInfo",UserDetailesSchema);
model.export = User;