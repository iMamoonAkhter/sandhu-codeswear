import { Order } from "@/models/Order";
import { connectDB } from "@/middleware/mongoose";
const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      email,
      paymentId,
      products,
      address,
      amount,
      city,
      pincode,
      state,
      onlinePayment,
      status
    } = req.body;

    // Validate required fields
    if (!email || !address || !amount || !city || !pincode || !state) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate products array
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'Invalid products data' });
    }


    // Validate each product has required fields
    for (const product of products) {
      if (!product.productId || !product.size || !product.color || !product.quantity) {
        return res.status(400).json({ error: 'Invalid product data' });
      }
    }


    let orderId = "";
    while(true){
      orderId = `ORD-${Math.floor(Math.random() * 1000000)}`; // Generate a random order ID
      // Create new order
      const checkID = await Order.findOne({ orderId });
      if(!checkID){
        break;
      }
    }
    const newOrder = new Order({
      email,
      orderId: orderId,
      paymentId: paymentId || '',
      products: products.map(product => ({
        productId: product.productId,
        title: product.title,
        img: product.img,
        amount: product.amount,
        size: product.size,
        color: product.color,
        quantity: product.quantity
      })),
      address,
      amount,
      city,
      pincode,
      state,
      onlinePayment: Boolean(onlinePayment),
      status: status || 'Pending'
    });

    // Save to database
    const savedOrder = await newOrder.save();

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: {
        id: savedOrder._id,
        orderId: savedOrder.orderId,
        status: savedOrder.status,
        amount: savedOrder.amount,
        products: savedOrder.products
      }
    });

  } catch (error) {
    console.error('Order creation error:', error);
    
    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation Error',
        details: Object.values(error.errors).map(e => e.message)
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({ 
        error: 'Duplicate order ID',
        solution: 'Please retry the request'
      });
    }

    return res.status(500).json({ 
      error: 'Internal Server Error',
      details: error.message 
    });
  }
};

export default connectDB(handler);