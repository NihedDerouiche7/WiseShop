import React , {useEffect , useState} from 'react'
import { Button, Col, Form, Row , Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {useLocation } from 'react-router-dom'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import FormContainer from '../Components/FormContainer'
import { useNavigate } from 'react-router-dom';
import { ListUsers , DeleteUser } from '../actions/userActions'
import {LinkContainer} from 'react-router-bootstrap' 
import swal from 'sweetalert';
import Meta from '../Components/Meta'

 
const UserListScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userList = useSelector(state=>state.userList)
    const {loading , error , users} = userList

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo } = userLogin


     const userDelete = useSelector(state=>state.userDelete)
    const {success:successDelete } = userDelete

    useEffect(()=>{
      if (userInfo && userInfo.isAdmin){
        dispatch(ListUsers())
      }else{
        navigate('/login')
      }
        
    },[dispatch,navigate,successDelete,userInfo])

    const deleteUserHandler =(id)=>{
      //  if(window.confirm('Are you sur !! ')){
      //   swal("Good job!", "User Removed", "warning");
      //    dispatch(DeleteUser(id))
      //  }
       
      //    console.log("delete");

      swal({
         title: "Are you sure?",
         text: "Once deleted, you will not be able to recover this user account !",
         icon: "warning",
         buttons: true,
         dangerMode: true,
           })
           .then((willDelete) => {
             if (willDelete) {
              dispatch(DeleteUser(id))
               swal("Poof! Your user account has been deleted!", {
                 icon: "success",
                 
               });
             } else {
               swal("Your user account is safe!");
             }
           });
    }


  return (
    <>
    <Meta title="User List"></Meta>
     <h1>Users List</h1> 
      {loading ? <Loader/> : error ? <Message variant ='danger' > {error}</Message> : (

        <Table striped responsive hover bordered className="table-sm">
                     <thead>
                        <tr>
                            <th> ID </th>
                            <th> Name </th>
                            <th> Email </th>
                            <th> Admin </th>
                            <th> Action </th>
                        </tr>
                     </thead>


                     <tbody>
                        {users.map(user=>( 
                            <tr key={user._id}>
                                 <td>{user._id}</td>
                                  <td>{user.name}</td>
                                  <td> <a href={`mailto:${user.email}`}> {user.email} </a> </td>
                                  <td>{user.isAdmin ? <i className="fas fa-check" style={{color:"green"}}></i> : <i className="fas fa-times" style={{color:"red"}}></i>}</td>
                                  <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                          <Button variant="light" className="btn-sm">
                                             <i className="fas fa-edit" ></i>
                                            </Button>
                                    </LinkContainer>

                                     <Button variant="danger" className="btn-sm mx-2" onClick={()=> {deleteUserHandler(user._id)}}>
                                            <i className="fas fa-trash"></i>
                                      </Button>
                                  </td>
                            </tr>
                        ))}
                     </tbody>
        </Table>


      )}
    </>
  )
}

export default UserListScreen
