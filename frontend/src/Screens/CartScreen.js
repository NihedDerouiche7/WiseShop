import React,{useEffect} from 'react'
import {useDispatch,useSelector}from 'react-redux'
import Message from '../Components/Message'
import { Link, useParams,useLocation } from 'react-router-dom'
import {Row , Col , ListGroup , Image , Button , Card, FormControl} from 'react-bootstrap'
import { addToCart,removeFromCart } from '../actions/cartAction'
import { useNavigate } from 'react-router-dom';
import Meta from '../Components/Meta'
 

const CartScreen = ({history}) => {
  
  const {productId}= useParams();
  const location = useLocation();
  console.log(productId,"product............")
  
  const qty=location.search ?Number(location.search.split('=')[1])  : 1


  const dispatch = useDispatch()

const cart = useSelector(state=>state.cart)
const {cartItems}=cart
console.log(cartItems)



  useEffect(()=>{
   if(productId){
    dispatch(addToCart(productId,qty))
   }
  
  
  },[dispatch,productId,qty])

 const removeFromCartHandler = (id)=>{
  console.log("remove")
  dispatch(removeFromCart(id))
 }

 let navigate = useNavigate();
 const checkoutHandler = ()=> {
  console.log("checkout")
  navigate(`/login?redirect=shipping`)
 }

  return (
    <Row>
    <Meta title="Cart"></Meta>
      <Col md={8}>
      <h1> Shopping Cart</h1>
      {cartItems.length ===0 ? <Message> Your cart is empty <Link to="/"> Go Back </Link> </Message> :(
       
       <ListGroup variant='flush'>
       {cartItems.map(item=>(
        <ListGroup.Item key={item.product}>
          <Row>
            <Col md={2}>
              <Image src={item.image} alt={item.name} fluid rounded />
            </Col>
            <Col md={3}>
              <Link to={`/product/${item.product}`}>{item.name}</Link>
            </Col>
             <Col md={2}>
              ${item.price}
             </Col>
             <Col md={2}>
             <FormControl 
             as="select" 
               value={item.qty} 
             onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}>
                        {
                    [...Array(item.countInStock).keys()].map(x=>(
                        <option key={x +1} value={x+1} >
                            {x+1}
                        </option>
                    ))
                }
                    </FormControl>
             </Col>
             <Col md={2}>
             <Button type='button' variant='light' onClick={()=> removeFromCartHandler(item.product)}>
              <i className='fas fa-trash'></i>
             </Button>
             </Col>
          </Row>
        </ListGroup.Item>
       ))}  
        </ListGroup>

      )}
      </Col>
      <Col md={4}>
       <Card>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2>subtotal ({cartItems.reduce((acc,item)=>acc+item.qty,0)}) items</h2>
          ${cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
        </ListGroup.Item>
        <ListGroup.Item>
          <Button type='button' className='btn-block' disabled={cartItems.length===0} onClick={checkoutHandler}>
            Proceed to Checkout
          </Button>
        </ListGroup.Item>
      </ListGroup>

       </Card> 
      </Col>

  
    </Row>
  )
}

export default CartScreen
