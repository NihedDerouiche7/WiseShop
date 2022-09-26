import React , { useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {useLocation } from 'react-router-dom'
import FormContainer from '../Components/FormContainer'
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartAction'
import CheckoutSteps from '../Components/checkoutSteps'
import Meta from '../Components/Meta'

const ShippingScreen = () => {

  const dispatch= useDispatch()
  let navigate = useNavigate();

  const cart = useSelector(state=>state.cart)
  const {shippingAddress}= cart

    const [address,setAddress]=useState(shippingAddress?.address)
    const [city,setCity]=useState(shippingAddress?.city)
    const [postalCode,setPostalCode]=useState(shippingAddress?.postalCode)
    const [telephone,setTelephone]=useState(shippingAddress?.telephone)

const submitHandler = (e)=>{
  e.preventDefault()
  dispatch(saveShippingAddress({address,city,postalCode,telephone}))
  navigate("/payment")
}

  return (
    <FormContainer>
    <Meta title="Shipping"></Meta>
      <CheckoutSteps step1 step2/>
      <h1>Shipping </h1>
      <Form onSubmit= {submitHandler}  >
      <Form.Group controlId="address" className="mt-4">
            <Form.Label> Address </Form.Label>
          <Form.Control type="text" 
                     placeholder="Enter your address" 
                     required
                     value={address} 
                     onChange= {(e)=> setAddress(e.target.value)}>  
          </Form.Control>
      </Form.Group>


      <Form.Group controlId="city" className="mt-4">
            <Form.Label> City </Form.Label>
          <Form.Control type="text" 
                     placeholder="Enter your city" 
                     required
                     value={city} 
                     onChange= {(e)=> setCity(e.target.value)}>  
          </Form.Control>
      </Form.Group>


      <Form.Group controlId="postalCode" className="mt-4">
            <Form.Label> PostalCode </Form.Label>
          <Form.Control type="text" 
                     placeholder="Enter your postalCode" 
                     required
                     value={postalCode} 
                     onChange= {(e)=> setPostalCode(e.target.value)}>  
          </Form.Control>
      </Form.Group>



      <Form.Group controlId="telephone" className="mt-4">
            <Form.Label> Telephone </Form.Label>
          <Form.Control type="text" 
                     placeholder="Enter your telephone" 
                     required
                     value={telephone} 
                     onChange= {(e)=> setTelephone(e.target.value)}>  
          </Form.Control>
      </Form.Group>


    <Button type='submit' variant='primary' className="mt-4">Continue</Button>
      </Form>


    </FormContainer>
  )
}

export default ShippingScreen
