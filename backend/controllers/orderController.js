import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'



//@desc create new order
//@route Post/api/order
//@access private

const addOrderItems= asyncHandler(async(req,res) =>{
   
   const {orderItems , shippingAddress , paymentMethod  , itemsPrice , shippingPrice , taxPrice , totalPrice} = req.body

   if ( orderItems && orderItems.length === 0) {
    res.status(400)
    res.json(createdOrder) 

   // throw new Error ('No order items')
}else {
    console.log(req.body);
    const order = new Order ({
        orderItems ,
        user: req.user._id,
        shippingAddress , 
        paymentMethod  , 
        itemsPrice , 
        shippingPrice , 
        taxPrice , 
        totalPrice
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder) 
}



})



//@desc Get order by ID
//@route GET/api/order/:id
//@access private

const getOrderById= asyncHandler(async(req,res) =>{
   
   let order = await Order.findById(req.params.id).populate('user')
   //order.user = await User.findById(order.user)

   if (order){
    res.json(order)
  
   }else{
    res.status(404) 
    throw new Error('not found')
   }
 
 })
 


//@desc Update order to paid
//@route GET/api/order/:id/pay
//@access private

const updateOrderToPaid= asyncHandler(async(req,res) =>{
   
   const order = await Order.findById(req.params.id)

   if (order){
    order.isPaid=true
    order.paidAt=Date.now()
    order.paymentResult= {
      id:req.body.id,
      statuts:req.body.status,
      update_time:req.body.update_time,
      email_address:req.body.email_address

    }
    const updateOrder= await order.save()
    res.json(updateOrder)
   }else{
    res.status(404) 
    throw new Error('not found')
   }
 
 })
 

//@desc  Get logged in user orders
//@routes get api/orders/myorders
//@access private

const getMyOrders =  asyncHandler( async (req , res ) => {
   console.log(req.user._id ,"dqsSqsfqF");
    const orders = await Order.find({user : req.user._id})
    res.json(orders)
}) 


//@desc  Get all orders
//@routes get api/orders
//@access private/admin

const getOrders =  asyncHandler( async (req , res ) => {
    let orders = await Order.find({}).populate('user','name')

   // for (let index = 0; index < orders.length; index++) {
   //    orders[index].user = await User.findById(orders[index].user);
      
   // }
    console.log('work for populate');
     res.json(orders)

  
});
   
//@desc   Update Order to delivered
//@routes get api/orders/:id/deliver
//@access private/admin

const updateOrderToDelivered =  asyncHandler( async (req , res ) => {
    const order = await Order.findById(req.params.id)
     
    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else {
        res.status(404)
        throw new Error ('Order not found')
    }
   
}) 
    


export {addOrderItems,getOrderById,updateOrderToPaid,getMyOrders,getOrders,updateOrderToDelivered}