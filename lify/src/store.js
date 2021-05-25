import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer, productDetailsReducer} from './Reducers/productReducers'
import { retailerDetailsReducer, retailerListReducer } from './Reducers/retailerReducers'

const reducer = combineReducers({

    productList:productListReducer,
    productDetails:productDetailsReducer,
    retailerList:retailerListReducer,
    retailerDetails:retailerDetailsReducer
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