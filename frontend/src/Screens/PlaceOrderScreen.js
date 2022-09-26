import React, { useEffect } from 'react'
import { Button , Row ,Col , Image , ListGroup , Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CheckoutSteps from '../Components/checkoutSteps'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { createOrder } from '../actions/orderAction'
import { useNavigate } from 'react-router-dom'
import { ORDER_CREAT_RESET } from '../constants/orderConstants'
import Meta from '../Components/Meta'
const PlaceOrderScreen = () => {

    const dispatch = useDispatch()
    let navigate = useNavigate();
    let cart = useSelector((state)=>state.cart)

    const addDecimal = (num ) => {
        return (Math.round(num*100)/100).toFixed(2)
    }

     //calculate prices
     cart = {...cart , itemsPrice:  addDecimal(cart.cartItems.reduce((acc, item ) => acc + item.price * item.qty , 0))}
   cart.shippingPrice = addDecimal(cart.itemsPrice > 1500 ? 0 : 50 )
   cart.taxPrice =addDecimal ( Number( cart.itemsPrice * 0.15 ))
   cart.totalPrice = addDecimal (Number(cart.taxPrice) +Number(cart.shippingPrice ) +Number(cart.itemsPrice))

    const orderCreate = useSelector(state=>state.orderCreate)
    const {order , success, error}      = orderCreate  


    useEffect(()=>{
        if(success){
            navigate(`/order/${order._id}`)
        dispatch ({
            type    : ORDER_CREAT_RESET, })
        }
       
    },[success])



    const placeOrderHandler=()=>{
        console.log(cart.paymentMethod);
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice, 
        }))
    }



  return (
    <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Meta title="PlaceOrder"></Meta>
            <Row>
                <Col md={8}>
                 
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address : </strong> 
                                {cart.shippingAddress.address} , {cart.shippingAddress.city}  {cart.shippingAddress.postalCode} , {cart.shippingAddress.telephone} 
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method :  </strong> 
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message> Your Cart is empty </Message> : 
                            (
                                <ListGroup variant = "flush" className="mt-4">
                                    {cart.cartItems.map((item , index) => (
                                        <ListGroup key={index}  className="mt-3">
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col >
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                        {item.qty} x ${item.price} = {item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup>
                                     ) )}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Items
                                    </Col>
                                    <Col>
                                        ${cart.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping
                                    </Col>
                                    <Col>
                                        ${cart.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax 
                                    </Col>
                                    <Col>
                                        ${cart.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total
                                    </Col>
                                    <Col>
                                        ${cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                         {error &&
                           <ListGroup.Item>
                    <Message variant="danger">{error}</Message>
                           </ListGroup.Item>
                         }
                            <ListGroup.Item>
                                <Button type="button" className="btn-block" disabled={cart.cartItems === 0} onClick={()=>placeOrderHandler()} >Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card> 






                </Col>
            </Row>
        </div>
  )
}

export default PlaceOrderScreen
