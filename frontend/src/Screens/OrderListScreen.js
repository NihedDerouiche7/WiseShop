import React, { useEffect } from 'react'
import {Button, Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'

import { listOrders } from '../actions/orderAction'
import { useNavigate } from 'react-router'

const OrderListScreen = () => {

    const dispatch = useDispatch()


    const orderList = useSelector(state => state.orderList)
    const {orders , loading , error } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } = userLogin


    let navigate = useNavigate()

    useEffect(() => {

        if( userInfo && userInfo.isAdmin)
        {   
            
            dispatch(listOrders())
        } else {
            navigate("/")  
        }
        

    }, [dispatch , userInfo    ])



console.log(orders);
    return (
        <>
            <h1>Orders List</h1>

            {loading ? <Loader/> : error ? <Message variant ='danger' > {error}</Message> : (
                 <Table striped responsive hover bordered className="table-sm">
                     <thead>
                        <tr>
                            <th> ID </th>
                            <th> User </th>
                            <th> Date </th>
                            <th> Total price </th>
                            <th> Paid </th>
                            <th> Delivered </th>
                            <th> Action </th>
                        </tr>
                     </thead>
                     <tbody>
                         {
                             orders.map(order => (
                                 <tr key = {order._id}>
                                     <td>{order._id}</td>
                                     <td>{order.user && order.user.name}</td>
                                     {console.log(order.user,"user")}
                                     <td> {order.createdAt.substring(0,10)} </td>
                                     <td> ${order.totalPrice}</td>
                                     <td>{order.isPaid ? order.paidAt.substring(0,10)  : <i className="fas fa-times" style={{color:"red"}}></i>}</td>
                                     <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : <i className="fas fa-times" style={{color:"red"}}></i>}</td>

                                     <td>
                                            <>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button variant="light" className="btn-sm">
                                                        Details
                                                    </Button>
                                                </LinkContainer>

                                            </>
                                    </td>
                                 </tr>
                             ))
                         }
                     </tbody>
                 </Table>
             ) }
        </>
    )
}

export default OrderListScreen

