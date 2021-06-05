
import axios from 'axios'

export const listRetailers = (id) => async (dispatch)=>{
    try {
        dispatch({type: 'RETAILER_LIST_REQUEST'})


        
        const {data} = await axios.get(`/api/retailer/town/${id}`)
        dispatch({
            type: 'RETAILER_LIST_SUCCESS',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'RETAILER_LIST_FAIL',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}


export const listRetailerDetails = (id) => async (dispatch)=>{
    try {
        dispatch({type: 'RETAILER_DETAILS_REQUEST'})


        const {data} = await axios.get(`/api/retailer/${id}`)
        dispatch({
            type: 'RETAILER_DETAILS_SUCCESS',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'RETAILER_DETAILS_FAIL',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const listRetailerOwnerDetails = (id) => async (dispatch, getState)=>{
    try {
        dispatch({type: 'OWNER_RETAILER_DETAILS_REQUEST'})


        const {userLogin: {userInfo}} = getState()

        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/retailer/find/${id}`, config)
        dispatch({
            type: 'OWNER_RETAILER_DETAILS_SUCCESS',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'OWNER_RETAILER_DETAILS_FAIL',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}



