const express=require("express")
const router=express.Router();
const{ AddProducts, FetchProducts, UpdateProducts, DeleteProducts }=require("../Controllers/Product_Controller");


router.post('/Addproduct',AddProducts)
router.get('/fetchproduct',FetchProducts)
router.put('updateproduct',UpdateProducts)
router.delete('deleteproduct',DeleteProducts)

module.exports=router;