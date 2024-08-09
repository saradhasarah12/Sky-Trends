const mongoose=require("mongoose")
const AdminDetailSchema =new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    password :{
        type:String,
        require:true
    },
    role :{
        type:String,
        require:true
    }
},{collation:"AdminInfo",});
const Admin = mongoose.model("AdminInfo",AdminDetailSchema)
model.export = Admin;