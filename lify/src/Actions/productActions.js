
import axios from 'axios'

export const listProducts = (id) => async (dispatch)=>{
    try {
        dispatch({type: 'PRODUCT_LIST_REQUEST'})


        
        const {data} = await axios.get(`/api/products/${id}`)
        dispatch({
            type: 'PRODUCT_LIST_SUCCESS',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'PRODUCT_LIST_FAIL',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const listProductsByRetailer = (id) => async (dispatch)=>{
    try {
        dispatch({type: 'PRODUCT_LIST_BY_RETAILER_REQUEST'})


        
        const {data} = await axios.get(`/api/products/retailer/${id}`)
        dispatch({
            type: 'PRODUCT_LIST_BY_RETAILER_SUCCESS',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'PRODUCT_LIST_BY_RETAILER_ERROR',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch)=>{
    try {
        dispatch({type: 'PRODUCT_DETAILS_REQUEST'})


        const {data} = await axios.get(`/api/products/view/${id}`)
        dispatch({
            type: 'PRODUCT_DETAILS_SUCCESS',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'PRODUCT_DETAILS_FAIL',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}


export const deleteProduct = (id) => async(dispatch, getState) => {


    try{
        dispatch({
            type: 'PRODUCT_DELETE_REQUEST'
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/products/${id}`, config)
        
        dispatch({
            type: 'PRODUCT_DELETE_SUCCESS',
        })

     
    }
    catch(error){
         dispatch({
            type: 'PRODUCT_DETAILS_FAIL',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }

}


export const createProduct = () => async(dispatch, getState) => {


    try{
        dispatch({
            type: 'PRODUCT_CREATE_REQUEST'
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(`/api/products/`, {} ,config)
        
        dispatch({
            type: 'PRODUCT_CREATE_SUCCESS',
            payload: data
        })

     
    }
    catch(error){
         dispatch({
            type: 'PRODUCT_CREATE_FAIL',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }

}


 export const updateProduct = (product) => async(dispatch, getState) => {


    try{
        dispatch({
            type: 'PRODUCT_UPDATE_REQUEST'
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/products/${product._id}`, product ,config)
        
        dispatch({
            type: 'PRODUCT_UPDATE_SUCCESS',
            payload: data
        })

     
    }
    catch(error){
         dispatch({
            type: 'PRODUCT_UPDATE_FAIL',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }

}