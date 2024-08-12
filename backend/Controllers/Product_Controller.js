const Product = require("../Models/Product");
const { deleteOne } = require("../Models/User");

module.exports.AddProducts=async(req,res)=>{
    const {name,discription,amount,brand,image,category}=req.body;
    try{
        const checkproductname= await Product.findOne({name})
        if(checkproductname==null){
            await Product.create({name,discription,amount,brand,image,category})
            res.send({status:"ok"});
        }
        else{
            res.send({status:"error"});
        }
    }
    catch(error){
        res.send({send:"catch error",status:(500)})
    }
}

module.exports.FetchProducts=async(req,res)=>{
    const {_id}=req.body();
    try{
        const data=await Product.findOne({_id:_id})
        res.send({status:"ok",data:data})
    }
    catch(error){
        console.log(error);
        
    }
}

module.exports.UpdateProducts=async(req,res)=>{
    const{_id,name,discription,amount,brand,image,category}=req.body;
    if(!_id){
        res.status(400).send({status:"error",message:"Invalid id or missing id"})
    }
    try{
        const updateddata=await Product.updateOne(
            {_id:_id},
            { $set :{name:name , discription:discription ,amount:amount, brand:brand,image:image,category:category}}
        );
        res.send({status :"ok",updateddata})
    }
    catch(error){
        console.log(error);
        res.status(500).send({status:"error",message:"invalid server error"})
        
    }
}

module.exports.DeleteProducts=async(req,res)=>{
    const{_id}=req.body();
    try{
        const data=await Product.deleteOne({_id : _id});
        if(data.deleteOne === 1){
            res.send({status:"ok", data:data})
        }
        else{
            res.send({status:"Failed",message:"Server not found"})
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send({status:"error",message:"error occurred while deleting product"})
        
    }
}
