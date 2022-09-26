import React, {useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {Row , Col , Image, ListGroup , Card , ListGroupItem, Button, Form, FormControl} from 'react-bootstrap'
import Rating from '../Components/Rating'
import {useDispatch , useSelector} from "react-redux"
import { listProductDetails,createProductReview } from '../actions/productAction'
import Loader from "../Components/Loader"
import Message from "../Components/Message"
import { useNavigate } from 'react-router-dom';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstanst'
import swal from 'sweetalert';
import Meta from '../Components/Meta'



const ProductScreen = () => {

const [qty,setQty] = useState(1)

const [rating,setRating] = useState(0)
const [comment,setComment] = useState("")

const { id } = useParams();

const dispatch= useDispatch()

const productDetails = useSelector(state => state.productDetails)
const {loading , error, product}=productDetails


 const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {   loading:loadingProductCreate , error:errorProductCreate ,success:successProductCreate } = productReviewCreate

const userLogin = useSelector(state => state.userLogin)
    const {   userInfo  } = userLogin

    console.log(userInfo.isAdmin);

useEffect(()=>{
     if(successProductCreate) {
            
            swal("Good job!", "Review Submitted !", "success");
            setComment('')
            setRating(0)
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
   dispatch(listProductDetails(id))
  },[dispatch,successProductCreate,id])

 let navigate = useNavigate();
const AddToCartHandler=()=>{
navigate(`/cart/${id}?qty=${qty}`)
}


 const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(id , {name:userInfo.name  , comment , rating}))
    }

return (
    <div>
     <Link className='btn btn-light my-3 ' to="/"> Go back  </Link>
     {(loading || loading === undefined) ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:(

<>
<Meta title={product.name}></Meta>
<Row>
<Col md={6}>
    <Image src={product.image} alt={product.name} fluid></Image>
</Col>

<Col md={3}>
    <ListGroup variant='flush' >
        <ListGroupItem>
        <h2>{product.name}</h2>
        </ListGroupItem>

        <ListGroupItem>
            <Rating value={product.rating}
             text={`${product.numReviews} reviews`}/>
        </ListGroupItem>

        <ListGroupItem>
            Price : ${product.price}
        </ListGroupItem>


        <ListGroupItem>
            Description : ${product.description}
        </ListGroupItem>
    </ListGroup>
</Col>


<Col md={3}>
<Card>
    <ListGroup variant='flush'>
        <ListGroupItem>
            <Row>
                <Col>
                Price : 
                </Col>
                <Col>
                <strong>$ {product.price}</strong>
                </Col>
            </Row>
        </ListGroupItem>

        <ListGroupItem>
            <Row>
                <Col>
                Status : 
                </Col>
                <Col>
                {product.countInStock >0 ?  'in Stock': 'Out of Stock'}
                </Col>
            </Row>
        </ListGroupItem>

        {product.countInStock >0 && (
            <ListGroup.Item>
                <Row>
                    <Col>Qty </Col>
                    <Col>
                    <FormControl as="select"   value={qty} onChange={(e)=>setQty(e.target.value)}>
                        {
                    [...Array(product.countInStock).keys()].map(x=>(
                        <option key={x +1} value={x+1} >
                            {x+1}
                        </option>
                    ))
                }
                    </FormControl>
                    </Col>
                </Row>
            </ListGroup.Item>
        )}

        <ListGroupItem>
            <Button 
            onClick={AddToCartHandler}
            className='btn-block' type='Buttom' disabled={product.countInStock ===0}>
                Add To Card
            </Button>
        </ListGroupItem>

    </ListGroup>
</Card>
</Col>
</Row>

<Row>
                        <Col md={6}>
                            <h2  className="my-5" >Reviews</h2> 
                            {product.reviews?.length === 0 && <Message variant="info"> No reviews </Message>}   
                            <ListGroup variant="flush" >
                            {
                                product.reviews?.map(review => (
                                    <ListGroup.Item key={review._id}  className="my-2" >
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} ></Rating>
                                        <p>{review.createdAt.substring(0,10)}</p>
                                        <p> { review.comment } </p>
                                    </ListGroup.Item>
                                ))
                            }
                          { !userInfo.isAdmin && (
                            <ListGroup.Item className="my-4" >
                                <h2> Write Customer review </h2>
                                {loadingProductCreate && <Loader/>}
                                {errorProductCreate && <Message variant="danger" > {errorProductCreate} </Message>}
                                {userInfo ? ( 
                                    <Form onSubmit={(e) => submitHandler(e) }>
                                        <Form.Group>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control as="select" value={rating} onChange={(e)=>setRating(e.target.value)} > 
                                                <option> Choose rating ... </option>
                                                <option value="1"> 1-poor </option>
                                                <option value="2"> 2-fair </option>
                                                <option value="3"> 3-good </option>
                                                <option value="4"> 4-very good </option>
                                                <option value="5"> 5-excellent </option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="comment">
                                            <Form.Label>Comment</Form.Label>
                                                <Form.Control as="textarea" value={comment} onChange={(e)=>setComment(e.target.value)}>
                                                </Form.Control>
                                        </Form.Group>
                                        <Button type="submit" variant="primary" className="my-2"> Submit </Button>
                                    </Form>
                                 ) : <Message variant="info"> Please <Link to="/login"> Login </Link> to write a review   </Message> }
                            </ListGroup.Item>
                          )}
                            
                            </ListGroup>                  
                        </Col>
                    </Row>

   </>  )}
      
    </div>
  )
}

export default ProductScreen
