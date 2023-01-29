import React,{useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../Components/Product'
import {useDispatch, useSelector} from 'react-redux'
import { listProduct } from '../actions/productAction'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { useParams } from 'react-router'
import Paginate from '../Components/paginate'
import ProductCarousel from '../Components/ProductCarousel'
import {Helmet} from "react-helmet";
import Meta from '../Components/Meta'
import { Link } from 'react-router-dom'


const HomeScreen = () => {

const dispatch = useDispatch()
let {keyword}=useParams();
const {pageNumber} = useParams() ||1
  
const productList = useSelector(state=>state.productList)
const {loading , error , products , page, pages}= productList

  useEffect(()=>{
   dispatch(listProduct(keyword,pageNumber))
  },[dispatch,keyword,pageNumber])

 


  return (
    <>
   <Meta></Meta>
    {!keyword ? <ProductCarousel/>: <Link to='/' className='btn btn-light'> <i className="fas fa-arrow-left fa-3x"></i></Link> }
      <h1> Latest products</h1>
      {loading ? <Loader/>: error  ? <Message variant="danger">{error}</Message> :(
        <>
         <Row>
        {products.map(product =>(
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}/>
            </Col>
        ))}
      </Row>
      <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''}/>
      </>
      ) }
     
      </>
  )
}

export default HomeScreen
