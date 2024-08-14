
const Cart = require("../Models/Cart");
const Product = require("../Models/Product");

// Add or Update Products in Cart
module.exports.AddCartProducts = async (req, res) => {
    const { userId, products } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Update existing cart
            for (const product of products) {
                const { productId, quantity } = product;
                let productInCart = cart.products.find(p => p.productId.toString() === productId);

                if (productInCart) {
                    productInCart.quantity += quantity; // Increase quantity
                } else {
                    cart.products.push({ productId, quantity }); // Add new product
                }
            }

            // Calculate total amount based on updated products
            cart.totalAmount = await calculateTotalAmount(cart.products);
        } else {
            // Create new cart
            cart = new Cart({
                userId,
                products,
                totalAmount: await calculateTotalAmount(products) // Calculate total amount
            });
        }

        await cart.save();
        return res.status(200).json({ message: "Cart updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating cart" });
    }
};

// Remove Product from Cart
module.exports.RemoveProductFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            cart.products = cart.products.filter(product => product.productId.toString() !== productId);

            // If no products are left, delete the cart
            if (cart.products.length === 0) {
                await Cart.deleteOne({ userId });
            } else {
                // Recalculate total amount
                cart.totalAmount = await calculateTotalAmount(cart.products);
                await cart.save();
            }

            return res.status(200).json({ message: "Product removed from cart" });
        } else {
            return res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error removing product from cart", error: error.message });
    }
};

const calculateTotalAmount = async (products) => {
    let totalAmount = 0;
    for (const product of products) {
        const productDetails = await Product.findById(product.productId);
        if (productDetails) {
            totalAmount += productDetails.amount * product.quantity; // Assuming amount is the price of the product
        }
    }
    return totalAmount;
};