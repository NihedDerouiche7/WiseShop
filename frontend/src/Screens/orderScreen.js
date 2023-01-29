import React, { useEffect, useState } from 'react'
import {
  Button,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  ListGroupItem,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderAction'
import { useNavigate } from 'react-router-dom'
import { ORDER_CREAT_RESET } from '../constants/orderConstants'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

const OrderScreen = () => {
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useSelector((state) => state.orderDetails)
  let { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  let { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  let { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [itemsPrice, setItemsPrice] = useState(0)
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const { orderId } = useParams()
  //  //calculate prices

  // if(!loading)
  // { let order= {...order,itemsPrice :  order.orderItems.reduce((acc, item ) => acc + item.price * item.qty , 0)}}

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      console.log(clientId)
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || order._id != orderId || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
        console.log('test2')
      } else {
        setSdkReady(true)
        console.log('test3')
      }
    }
  }, [dispatch, orderId, successPay, order, successDeliver, navigate])

  useEffect(() => {
    if (!loading) {
      setItemsPrice(
        addDecimal(
          order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
      )
    }
  }, [loading])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                {' '}
                <strong style={{ color: 'red' }}> Name : </strong>{' '}
                {order.user.name}
              </p>

              <p>
                <a href={`mailto:${order.user.email}`}>
                  <strong style={{ color: 'red' }}>Email :</strong>{' '}
                  {order.user.email}
                </a>
              </p>
              <p>
                <strong style={{ color: 'red' }}>Address : </strong>
                {order.shippingAddress.address} ,{order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode}{' '}
              </p>
              <p>
                <strong style={{ color: 'red' }}>Telephone :</strong>{' '}
                {order.shippingAddress.telephone}
              </p>

              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger"> Not Delivered </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method : </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger"> Not found </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message> order is empty </Message>
              ) : (
                <ListGroup variant="flush" className="mt-4">
                  {order.orderItems.map((item, index) => (
                    <ListGroup key={index} className="mt-3">
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup>
                  ))}
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
                  <Col>Items</Col>
                  <Col>DT {itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>DT{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>DT{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>DT{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && !userInfo.isAdmin && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {console.log(loadingPay)}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    >
                      {' '}
                    </PayPalButton>
                  )}
                  {console.log(sdkReady)}
                </ListGroup.Item>
              )}
              {loading && <Loader />}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
