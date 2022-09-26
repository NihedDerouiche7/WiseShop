import React from 'react'
import { Navbar , Nav , Container , NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap' 
import { useDispatch,useSelector } from 'react-redux'
import {Logout } from '../actions/userActions'
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox'

const Header = () => {

const dispatch = useDispatch()
let navigate = useNavigate()

  const  userLogin= useSelector(state=>state.userLogin)
  const {userInfo}=userLogin 

  const logoutHandler=()=>{
    dispatch(Logout())
    navigate('/')
  }

  return (
    <header>
     <Navbar  bg="primary" variant='dark' expand="lg" collapseOnSelect>
  <Container>
    <LinkContainer to="/">
    <Navbar.Brand >WiseShop</Navbar.Brand>
    </LinkContainer>
  
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <SearchBox/>
      <Nav className="ml-auto">
        <LinkContainer to="/cart">
        <Nav.Link ><i i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
        </LinkContainer>
       {userInfo?(
        <NavDropdown  title={userInfo.name} id='username' >
          <LinkContainer to='/profile'>
            <NavDropdown.Item><i className='fas fa-user'></i> Profile</NavDropdown.Item>
          </LinkContainer>  
            <NavDropdown.Item onClick={logoutHandler}> Logout </NavDropdown.Item>
        </NavDropdown>
       ):<LinkContainer to="/Login">
       <Nav.Link href="/Login"><i i className='fas fa-user'></i>Sign In</Nav.Link>
       </LinkContainer>
       }
       {userInfo && userInfo.isAdmin && (
        <NavDropdown title="Admin" id='adminmenu'>
          <LinkContainer to='/admin/userlist'>
            <NavDropdown.Item>Users</NavDropdown.Item>
          </LinkContainer> 

           <LinkContainer to='/admin/productlist'>
            <NavDropdown.Item>Products</NavDropdown.Item>
          </LinkContainer>  

           <LinkContainer to='/admin/orderlist'>
            <NavDropdown.Item>Orders</NavDropdown.Item>
          </LinkContainer>  
           
        </NavDropdown>
       )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </header>
  )
}

export default Header
