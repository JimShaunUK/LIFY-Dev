
export const cartReducer =(state={cartItems:[], shippingAdress:{}, order:{}}, action)=>{
    switch(action.type){
        case 'CART_ADD_ITEM':
            const item = action.payload
            const existItem = state.cartItems.find(x=> x.product === item.product)
            if(existItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map(x=>x.product === existItem.product ? item:x)
                }

            }else{
                return{
                ...state,
                cartItems:[...state.cartItems, item]
                }
            }
        case 'CART_REMOVE_ITEM':
            return{
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        case 'CART_SAVE_SHIPPING_ADDRESS':
            return{
                ...state,
                shippingAddress: action.payload,
            }
        case 'CART_SAVE_PAYMENT_METHOD':
            return{
                ...state,
                paymentMethod: action.payload,
            }
        case 'CART_CLEAR_ITEMS':
            return {
                 ...state,
                 cartItems: [],
            }
        case 'CREATE_ORDER_MANIFEST':
            return{
                ...state,
                order: action.payload,
            }
        case 'REMOVE_ORDER_MANIFEST':
            return{
                ...state,
                order: {},
            }
        default:
            return state
    }
}
