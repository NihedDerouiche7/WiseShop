import React , {useEffect , useState} from 'react'
import { Button, Col, Form, Row , Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {useLocation } from 'react-router-dom'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import FormContainer from '../Components/FormContainer'
import { useNavigate } from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap' 
import swal from 'sweetalert';
import { listProduct,deleteProduct,createProduct } from '../actions/productAction'
import { PRODUCT_CREATE_RESET } from '../constants/productConstanst'
import Paginate from '../Components/paginate'
import { useParams } from 'react-router'
 
const ProductListScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

 let  {pageNumber} = useParams() || 1  

    const productList = useSelector(state=>state.productList)
    const {loading , error , products , page , pages} = productList

    const productDelete = useSelector(state=>state.productDelete)
    const {loading:loadingDelete , error:errorDelete , success:successDelete} = productDelete

    const productCreate = useSelector(state=>state.productCreate)
    const {loading:loadingCreate , error:errorCreate , success:successCreate,product:createdProduct} = productCreate

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo } = userLogin


    

    useEffect(()=>{
      dispatch({type:PRODUCT_CREATE_RESET})

      if (!userInfo.isAdmin){
        navigate('/login')
      }

      if(successCreate){
        navigate(`/admin/product/${createdProduct._id}/edit`)
      }else{
         dispatch(listProduct('',pageNumber))
      }

    },[dispatch,navigate,userInfo,successDelete,successCreate,createProduct,pageNumber])

    const deleteProductHandler =(id)=>{
     swal({
         title: "Are you sure?",
         text: "Once deleted, you will not be able to recover this user account !",
         icon: "warning",
         buttons: true,
         dangerMode: true,
           })
           .then((willDelete) => {
             if (willDelete) {
              dispatch(deleteProduct(id))
               swal("Poof! Your product has been deleted!", {
                 icon: "success",
                 
               });
             } else {
               swal("Your product is safe!");
             }
           });
    }

     const createProductHandler =()=>
     {
      dispatch(createProduct())

     }

  return (
    <>
    <Row className='align-item-center'>
        <Col>
            <h1>Products</h1>
        </Col>
        <Col className='text-right'>
            <button className='btn btn-success my-4' onClick={createProductHandler}> 
            <i className='fas fa-plus '></i>  Create Product 
            </button>
        </Col>
    </Row>

      
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {successCreate && <Loader/>}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? <Loader/> : error ? <Message variant ='danger' > {error}</Message> : (
        <>
        <Table striped responsive hover bordered className="table-sm">
                     <thead>
                        <tr>
                            <th> ID </th>
                            <th> Name </th>
                            <th> Price </th>
                            <th> Category </th>
                            <th> Brand </th>
                            <th> Action </th>
                        </tr>
                     </thead>


                     <tbody>
                        {products.map(product=>( 
                            <tr key={product._id}>
                                 <td>{product._id}</td>
                                  <td>{product.name}</td>
                                  <td>${product.price} </td>
                                  <td>{product.category}</td>
                                  <td>{product.brand}</td>
                                  <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                          <Button variant="light" className="btn-sm">
                                             <i className="fas fa-edit" ></i>
                                            </Button>
                                    </LinkContainer>

                                     <Button variant="danger" className="btn-sm mx-2" onClick={()=> {deleteProductHandler(product._id)}}>
                                            <i className="fas fa-trash"></i>
                                      </Button>
                                  </td>
                            </tr>
                        ))}
                     </tbody>
        </Table>

        <Paginate page={page} pages={pages} isAdmin={true}/>
                          </>

      )}
    </>
  )
}

export default ProductListScreen
 