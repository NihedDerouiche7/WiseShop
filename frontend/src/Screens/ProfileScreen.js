import React , {useEffect , useState} from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserDetails ,updateUserProfile} from '../actions/userActions'
import {useLocation } from 'react-router-dom'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { useNavigate } from 'react-router-dom';
import {listMyOrders} from "../actions/orderAction"
import Meta from '../Components/Meta'

const ProfileScreen = () => {

  const dispatch  = useDispatch()
  const location = useLocation();

  const [email,setEmail]=useState('')
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [ConfirmPassword,setConfirmPassword]=useState('')
  const [message,setMessage]=useState(null)


  const userDetails = useSelector(state => state.userDetails)
  const {loading  , user , error } = userDetails


 


  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const {success} = userUpdateProfile

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo   } = userLogin 


  const orderListMy = useSelector(state => state.orderListMy)
  const {loading:loadingOrders , error:errorOrders ,orders } = orderListMy 

  
console.log(orders,"hhhhhhhhhhheyyyyyyyyyyyyyyy1");

  let navigate = useNavigate();
  
  useEffect(() => {
    if(!userInfo) {
        navigate("/")
        
    }
    else if (!userInfo.name) {
      
        dispatch(getUserDetails('profile'))
       
        
   } else {
     dispatch(listMyOrders())
    console.log(userInfo.name);
        setEmail(userInfo.email)
        setName(userInfo.name)
   }

   
}, [dispatch , userInfo , user , success ]) 

  const submitHandler = (e) => {
    e.preventDefault()
    //Dispatch register
    if(password !== ConfirmPassword){
        setMessage("password do not match ")
    }else{
      dispatch(updateUserProfile({id : userInfo._id  , name  , email  , password}))
    }
  
}

  return (
    <Row className="justify-content-center">
    <Meta title={name}></Meta>
    <Col md="3" >
    
        <h2>User Profile</h2>
        { error && <Message variant="danger">{error}</Message> }
        { message && <Message variant="danger">{message}</Message> }
        { success && <Message variant="success">Profile Updated </Message> }
        { loading && <Loader/> }
        <Form onSubmit= {submitHandler} >
            <Form.Group controlId="name">
                <Form.Label> Name </Form.Label>
                <Form.Control type="text" placeholder="Enter Name" value={name} onChange= {(e)=> setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label> Email Address </Form.Label>
                <Form.Control type="email" placeholder="Enter Email" value={email} onChange= {(e)=> setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="password" className="mt-4">
                <Form.Label> Password </Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} onChange= {(e)=> setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="mt-4">
                <Form.Label> Confirm Password </Form.Label>
                <Form.Control type="password" placeholder="Enter confirmation password" value={ConfirmPassword} onChange= {(e)=> setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type="submit" style={{marginTop:"15px"}} variant="primary" > Update</Button>
        </Form>   
    </Col>     

    <Col md={9}>
        <h2>My Order</h2>
        {loadingOrders? <Loader/> : errorOrders? <Message variant="danger">{errorOrders}</Message> : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>date</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order=>(
                    <tr key={order._id} >
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0,10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                            {order.isPaid? order.paidAt.substring(0,10):(
                            <i className='fas fa-times' style={{color:'red'}}></i>
                            )}
                        </td>
                       
                       <td>
                            {order.isDelivered? order.deliveredAt.substring(0,10):(
                            <i className='fas fa-times' style={{color:'red'}}></i>
                            )}
                        </td>
                        <Link to={`/order/${order._id}`}>
                            <Button variant='warning'className='btn-sm' > Details</Button>
                        </Link>
                        


                    </tr>
                ))}
            </tbody>

          </Table>  
        )}
    </Col>       
</Row>
  )
}

export default ProfileScreen
