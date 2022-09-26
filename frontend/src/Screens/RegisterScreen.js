import React , {useEffect , useState} from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userRegister } from '../actions/userActions'
import {useLocation } from 'react-router-dom'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import FormContainer from '../Components/FormContainer'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'
const RegisterScreen = () => {

  const dispatch  = useDispatch()
  const location = useLocation();

  const [email,setEmail]=useState('')
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [ConfirmPassword,setConfirmPassword]=useState('')
  const [message,setMessage]=useState(null)


  const userRegiste = useSelector(state => state.userRegister)
  const {loading  , userInfo , error } = userRegiste

  const redirect  = location.search ? location.search.split('=')[1] : '/' ;

  let navigate = useNavigate();
  useEffect(() => {
    if(userInfo) {
        navigate(redirect)
    }   
}, [ userInfo , redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    //Dispatch register
    if(password !== ConfirmPassword){
        setMessage("password do not match ")
    }else{
        dispatch(userRegister(name,email,password))
        swal("Good job!", "You account has been created!", "success");
    }
  
}

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      { error &&  <Message variant="danger">{error}</Message>  }
      { message &&  <Message variant="danger">{message}</Message>  }
      { loading && <Loader/> }
      <Form onSubmit= {submitHandler} >
         
      <Form.Group controlId="name"className="mt-4">
               <Form.Label> Name </Form.Label>
                <Form.Control type="text" placeholder="Enter Your Name" value={name} onChange= {(e)=> setName(e.target.value)}></Form.Control>
            </Form.Group>
         
         
         
         
           <Form.Group controlId="email" className="mt-4">
               <Form.Label> Email Address </Form.Label>
                <Form.Control type="email" placeholder="Enter Email" value={email} onChange= {(e)=> setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="password" className="mt-4">
                        <Form.Label> Password </Form.Label>
                        <Form.Control type="password" placeholder="Enter password" value={password} onChange= {(e)=> setPassword(e.target.value)}></Form.Control>
            </Form.Group>


            <Form.Group controlId="ConfirmPassword" className="mt-4">
                        <Form.Label> Confirm Password </Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" value={ConfirmPassword} onChange= {(e)=> setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>


            <Button type="submit" style={{marginTop:"15px"}} variant="primary" > Register</Button>
      </Form>

      <Row className="py-3" >
                    <Col>
                       Have An Account  ? 
                        <Link to={redirect !== '/' ? `/login?redirect=${redirect}` : 
                        '/login'}> Login </Link>
                    </Col>
                </Row> 
      
      </FormContainer>
  )
}

export default RegisterScreen
