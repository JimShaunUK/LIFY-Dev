import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer, productDetailsReducer, productListByRetailerReducer} from './Reducers/productReducers'
import { retailerDetailsReducer, retailerListReducer } from './Reducers/retailerReducers'
import { townDetailsReducer, townListReducer } from './Reducers/townReducers'
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from './Reducers/userReducers'
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderPayReducer } from './Reducers/orderReducers'

const reducer = combineReducers({

    productList:productListReducer,
    productDetails:productDetailsReducer,
    retailerList:retailerListReducer,
    retailerDetails:retailerDetailsReducer,
    townList:townListReducer,
    townDetails:townDetailsReducer,
    productListByRetailer:productListByRetailerReducer,
    userLogin: userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
    orderList:orderListReducer,
    orderDeliver:orderDeliverReducer

})

const cartItemsFromStorage = localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems')):[]


const userInfoFromStorage = localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):[]

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')?
    JSON.parse(localStorage.getItem('shippingAddress')):[]

const initialState = {
    cart:{
        cartItems:cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin:{
        userInfo: userInfoFromStorage
    }
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store