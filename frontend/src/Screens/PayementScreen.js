import React, { useEffect, useState } from 'react'
import { Button, Form  , Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartAction';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../Components/checkoutSteps';
import FormContainer from '../Components/FormContainer';
import Meta from '../Components/Meta';


const PaymentScreen = () => {

    let navigate = useNavigate();


    const cart = useSelector(state => state.cart)
    const {shippingAddress } = cart
    
    const [paymentMethod, setPaymentMethod] = useState('Paypal')


    const dispatch = useDispatch()

    useEffect(() => {
        if(!shippingAddress.address) {
            navigate('/shipping')
        }
    }, [shippingAddress ])

    const submitHandler = (e) => {
            e.preventDefault()
            dispatch(savePaymentMethod(paymentMethod))
            navigate('/placeorder')
    }
    return (
        <FormContainer>
        <Meta title="Payment Method"></Meta>
            <CheckoutSteps step1 step2 step3 />
            <h2>Payment method </h2>
            <Form onSubmit={(e)=>submitHandler(e)}>
                <Form.Group controlId="address" className="mt-4">
                    <Form.Label as="legend"> Select Method </Form.Label>
                    <Col>
                    <Form.Check type="radio" label="PayPal or Credit Card" id="PayPal" name="paymentMethod" value="PayPal" checked onChange={(e)=>setPaymentMethod(e.target.value)} className="mt-4"></Form.Check>
                       
                    </Col>
                </Form.Group>

            
                <Button type="submit" variant="primary" className="mt-3"> Continue </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen