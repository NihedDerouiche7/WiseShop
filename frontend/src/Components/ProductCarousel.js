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
        <Carousel pause='hover' className='bg-dark' prevLabel="" nextLabel="" indicators="false" variant='light'>
           {
         products.map(product => (
             <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}  >
                
                    <div className='carouselcaption'>

                        <h2> {product.name}  </h2>
                    </div>
                

                        <Image src={product.image} alt={product.name}  fluid/>
              
                    <Carousel.Caption className='carousel-caption'>
                
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