import { CART_ADD_ITEM ,CART_REMOVE_ITEM,CART_RESET,CART_SAVE_PAYMENT_METHOD,CART_SAVE_SHIPPING_ADDRESS} from "../constants/cartConstants";


export const cartReducer= (state={cartItems:[] , shippingAddress:{}},action)=>{
   
    switch(action.type){
        case CART_ADD_ITEM: 
        console.log('existItem')
        const item=action.payload
        const existItem = state.cartItems.find(x=>x.product===item.product)
  
        if(existItem){
            console.log(existItem)
            return {
                ...state,
               cartItems:state.cartItems.map(x=>x.product=== existItem.product ? item : x),
               shippingAddress:state.shippingAddress
            }
        }else{
           return {
            ...state,
            cartItems:[...state.cartItems,item],
            shippingAddress:state.shippingAddress
           } 
        }
        case CART_REMOVE_ITEM:
         return{
            ...state,
            cartItems:state.cartItems.filter((x)=>x.product !== action.payload),
            shippingAddress:state.shippingAddress
         }   
         case CART_SAVE_SHIPPING_ADDRESS:
            return{
               ...state,
               shippingAddress: action.payload
            }   
            case CART_SAVE_PAYMENT_METHOD:
                return {
                    ...state, 
                    paymentMethod :  action.payload , 
                }
            case CART_RESET : 
            return {
                cartItems : []
            }    
        default:
            return state
    }
}