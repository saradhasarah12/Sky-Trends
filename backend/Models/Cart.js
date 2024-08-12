const mongoose= require("mongoose")
const CartDetailSchema =new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      
      products: [{
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        }
      }],
      totalAmount: {
        type: Number,
      }
},{collation:"CartInfo",});
const Cart=mongoose.model("CartInfo",CartDetailSchema);
model.export= Cart;