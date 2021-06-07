import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer, productDetailsReducer, productListByRetailerReducer, searchAllReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productListManageReducer} from './Reducers/productReducers'
import { retailerDetailsOwnerReducer, retailerDetailsReducer, retailerListReducer, retailerDashboardReducer } from './Reducers/retailerReducers'
import { townDetailsReducer, townListReducer } from './Reducers/townReducers'
import { customerDetailsReducer, userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from './Reducers/userReducers'
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderPayReducer, retailerOrderDetailsReducer, retailerOrderListReducer } from './Reducers/orderReducers'
import { cartReducer } from './Reducers/cartReducer'
import {courierListReducer, courierAcceptReducer, getDeliveryDataReducer, deliveryCompleteReducer} from './Reducers/courierReducers'

const reducer = combineReducers({

    productManageList:productListManageReducer,
    productList:productListReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    deliveryData:getDeliveryDataReducer,
    deliveryComplete:deliveryCompleteReducer,
    courierList:courierListReducer,
    courierAccept:courierAcceptReducer,
    retailerList:retailerListReducer,
    retailerDetails:retailerDetailsReducer,
    retailerDashboard:retailerDashboardReducer,
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
    cart:cartReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
    orderList:orderListReducer,
    orderDeliver:orderDeliverReducer,
    searchAll:searchAllReducer,
    retailerOrderList:retailerOrderListReducer,
    retailerOrderDetails:retailerOrderDetailsReducer,
    retailerDetailsOwner:retailerDetailsOwnerReducer,
    customerDetails:customerDetailsReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems')):[]


const userInfoFromStorage = localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):[]

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')?
    JSON.parse(localStorage.getItem('shippingAddress')):[]

const orderFromStorage = localStorage.getItem('lifyOrder')?
    JSON.parse(localStorage.getItem('lifyOrder')):[]

const initialState = {
    cart:{
        cartItems:cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        order: orderFromStorage
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