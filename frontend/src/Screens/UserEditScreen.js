import React , {useEffect , useState} from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {useLocation } from 'react-router-dom'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import FormContainer from '../Components/FormContainer'
import { useNavigate } from 'react-router-dom';
import { getUserDetails , updateUser, updateUserAdminReducer} from '../actions/userActions'
import { useParams } from 'react-router'
import { USER_UPDATE_RESET } from '../constants/userConstanst'

const UserEditScrenn = () => {

  const dispatch  = useDispatch()
  const location = useLocation();

  const { userId } = useParams();

  const [email,setEmail]=useState('')
  const [name,setName]=useState('')
  const [isAdmin,setIsAdmin]=useState(false)
 


  const userDetails = useSelector(state => state.userDetails)
  const {loading  , error  , user } = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const {loading:loadingUpdate  , error:errorUpdate  , success:successUpdate } = userUpdate

  let navigate = useNavigate();

  useEffect(() => {

    if ( successUpdate){
      dispatch({type:USER_UPDATE_RESET })
      navigate("/admin/userlist")
    }else{
    if(!user.name || user._id !== userId){
      dispatch(getUserDetails(userId))
    }else{
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
    }

}, [ user, dispatch , userId,successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({_id:userId,name , email , isAdmin}))

}
console.log(loading);
  return (

    <>
      <Link to="/admin/userlist" className='btn btn-light my-3'> Go Back</Link>

       <FormContainer>
      <h1>Edit User</h1>
       { loadingUpdate &&  <Loader/>}
       { errorUpdate &&  <Message variant="danger">{errorUpdate}</Message>}
       {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
        <Form onSubmit= {submitHandler} >
      <Form.Group controlId="name"className="mt-4">
                <Form.Label> Name </Form.Label>
                <Form.Control type="text" placeholder="Enter Your Name" value={name} onChange= {(e)=> setName(e.target.value)}></Form.Control>
            </Form.Group>
         
         
         
         
           <Form.Group controlId="email" className="mt-4">
               <Form.Label> Email Address </Form.Label>
                <Form.Control type="email" placeholder="Enter Email" value={email} onChange= {(e)=> setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin" className="mt-4">
                   <Form.Check type="checkbox" label="Is Admin" 
                    checked={isAdmin}
                    onChange= {(e)=> setIsAdmin(e.target.checked)}></Form.Check>
            </Form.Group>

 
        


            <Button type="submit" style={{marginTop:"15px"}} variant="primary" > Update </Button>
      </Form>
       )}
      

      
      </FormContainer>
    </>

   
  )
}

export default UserEditScrenn
