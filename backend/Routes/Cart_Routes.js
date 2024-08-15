const express = require("express");
const router  = express.Router();
const {AddCartProducts, RemoveProductFromCart} = require("../Controllers/Cart_Controller")
router.post('/addCart', AddCartProducts);
router.post('/removeCart',RemoveProductFromCart);
module.exports=router;