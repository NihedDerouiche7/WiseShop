import React , {useEffect} from 'react'
import { Carousel ,Image} from "react-bootstrap"
import { useDispatch,useSelector } from 'react-redux'
import Loader from "./Loader"
import Message from './Message'
import { listTopProduct } from '../actions/productAction'
import { Link } from 'react-router-dom'



const ProductCarousel = () => {


    const dispatch = useDispatch()
    const productTopRated = useSelector(state => state.productTopRated)
    const {loading , products , error } = productTopRated
       console.log(products);
    
console.log(products);
    useEffect(() => {
     
        dispatch(listTopProduct())

    }, [dispatch ])

    console.log(products);
    return loading ? <Loader /> : error ? <Message variant="danger">  {error} </Message> : (
        <>
        <Carousel pause='hover' className='bg-dark'>
           {
         products.map(product => (
             <Carousel.Item key={product._id}>
                <Link to={`/products/${product._id}`} style={{position:"relative",    width: "100%", maxHeight: "500px"}} >
                        <Image src={product.image} alt={product.name}  style={{   width: "100%", height: "100%"}}  fluid/>
                
                    <Carousel.Caption className='carousel-caption' >
                        <h2> {product.name}  </h2>
                        <h3> ${product.price} </h3>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>

         ))}
        </Carousel>
        
        </>
    )
  
}
// style = {{position:"absolute" , top:'50%' , textAlign:"center" ,  width: "100%"}}
export default ProductCarousel