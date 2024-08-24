const User=require("../Models/User")
// const Admin=require("../Models/Admin")
const bcrypt =require("bcrypt")
const jwt =require("jsonwebtoken")
const SECRET_KEY='supersecret'

module.exports.UserLogin= async(req,res)=>{
    const{uname,password}=req.body
    console.log(uname);
    console.log(req.body)
    try{
        let user=null;
        let role=null;

        user=await User.findOne({ $or : [{email:uname},{phone:uname}]});
        if(!user){
            return res.json({error:"User Not Found"})
        }

        const valid=await bcrypt.compare(password,user.password);
        if(valid){
            const token = jwt.sign({ id: user._id, role: role }, SECRET_KEY,{ expiresIn: '8h' });
            return res.json({status:"ok",role:user.role,email:user.email,token:token})
        }
        
        else{
            return res.json({status:"error",error:"Invalid Password"})
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({status:"error",error:"Internal Server Error"});
    }
};

//User Register
module.exports.UserSignUp=async(req,res)=>{
    var {email,phone,password}=req.body;
    const role="user";
    console.log(req.body);
    try{
        const existingUser=await User.findOne({$or :[{email},{phone}]});
        if(existingUser){
            return res.status(400).send({status:"error",message:"User alredy existing with this email or phone"})
        }
        password=await bcrypt.hash(password,13);
        
        const data =new User({email,phone,password,role});
        
        await data.save();
        return res.send({status:"ok"});
    }
    catch(error){
        return res.status(500).send({status:"error",message:"An error occur during registration"})
    }
};

