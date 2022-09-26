
import {configureStore,combineReducers,applyMiddleware} from '@reduxjs/toolkit'
import thunk from 'redux-thunk' 
import {composeWithDevTools} from 'redux-devtools-extension'
import {  productListReducer ,productDetailReducer,productDeleteReducer, createProductReducer,updateProductReducer,productReviewCreateReducer, productTopRatedReducer } from "./reducers/productRreducers"
import {cartReducer} from "./reducers/cartReducers"
import { userLoginReducer , userRegisterReducer , userProfileDetailsReducer,userUpdateProfileReducer,userListReducer,UserDeleteReducer,updateUserAdminReducer} from './reducers/userReducers'
import { orderCreatReducer , orderDetailsReducer,orderPayReducer ,orderListMyReducer,orderListReducer,orderDeliverReducer} from './reducers/orderReducers'




const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailReducer,
    cart:cartReducer,
    userLogin: userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userProfileDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate: orderCreatReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
    userList:userListReducer,
    userDelete:UserDeleteReducer,
    userUpdate:updateUserAdminReducer,
    productDelete:productDeleteReducer,
    productCreate:createProductReducer,
    productUpdate:updateProductReducer,
    orderList:orderListReducer,
    orderDeliver:orderDeliverReducer,
    productReviewCreate:productReviewCreateReducer,
    productTopRated:productTopRatedReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialStore = {
  cart:{ 
    cartItems : cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,      
      },
   
  userLogin:{
    userInfo:userInfoFromStorage
            }

}


const middleware=[thunk]


const store = 
configureStore({    
  preloadedState : initialStore,
  reducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        middleware
      })
  })



export default store 
