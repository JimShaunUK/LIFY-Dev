import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer, productDetailsReducer, productListByRetailerReducer} from './Reducers/productReducers'
import { retailerDetailsReducer, retailerListReducer } from './Reducers/retailerReducers'
import { townDetailsReducer, townListReducer } from './Reducers/townReducers'

const reducer = combineReducers({

    productList:productListReducer,
    productDetails:productDetailsReducer,
    retailerList:retailerListReducer,
    retailerDetails:retailerDetailsReducer,
    townList:townListReducer,
    townDetails:townDetailsReducer,
    productListByRetailer:productListByRetailerReducer,
})

const lifyItemsFromStorage = localStorage.getItem('lifyItems')?
    JSON.parse(localStorage.getItem('lifyItems')):[]


const lifyUserFromStorage = localStorage.getItem('lifyUser')?
    JSON.parse(localStorage.getItem('lifyUser')):[]

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')?
    JSON.parse(localStorage.getItem('shippingAddress')):[]

const initialState = {
    cart:{
        lifyItems:lifyItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    lifyLogin:{
        lifyUser: lifyUserFromStorage
    }
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store