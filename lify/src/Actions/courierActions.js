import axios from 'axios'

export const listCourierOrders = () => async(dispatch, getState) => {


    try{
        dispatch({
            type: 'COURIER_LIST_REQUEST'
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/courier`, config)
        
        dispatch({
            type: 'COURIER_LIST_SUCCESS',
            payload: data
        })
    }
    catch(error){
        const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
   
         dispatch({
            type: 'COURIER_LIST_FAIL',
            payload: message
        })
    }

}


 export const courierAcceptOrder = (order) => async(dispatch, getState) => {


    try{
        dispatch({
            type: 'COURIER_ACCEPT_REQUEST'
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/courier/${order._id}`, order ,config)
        
        dispatch({
            type: 'COURIER_ACCEPT_SUCCESS',
            payload: data
        })

     
    }
    catch(error){
         dispatch({
            type: 'COURIER_ACCEPT_FAIL',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }

}



 export const getDeliveryData = (orderId) => async(dispatch, getState) => {


    try{
        dispatch({
            type: 'DELIVERY_DATA_REQUEST'
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/courier/${orderId}`,config)
        
        dispatch({
            type: 'DELIVERY_DATA_SUCCESS',
            payload: data
        })

     
    }
    catch(error){
         dispatch({
            type: 'DELIVERY_DATA_FAIL',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }

}


 export const completeDelivery = (order) => async(dispatch, getState) => {


    try{
        dispatch({
            type: 'DELIVERY_COMPLETE_REQUEST'
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/courier/complete/${order._id}`, order ,config)
        
        dispatch({
            type: 'DELIVERY_COMPLETE_SUCCESS',
            payload: data
        })

     
    }
    catch(error){
         dispatch({
            type: 'DELIVERY_COMPLETE_FAIL',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }

}