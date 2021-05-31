import axios from 'axios'

export const listTowns = () => async (dispatch)=>{
    try {
        dispatch({type: 'TOWN_LIST_REQUEST'})


        
        const {data} = await axios.get(`/api/towns`)
        dispatch({
            type: 'TOWN_LIST_SUCCESS',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'TOWN_LIST_FAIL',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const townDetails = (id) => async (dispatch)=>{
    try {
        dispatch({type: 'TOWN_DETAILS_REQUEST'})


        const {data} = await axios.get(`/api/towns/${id}`)
        dispatch({
            type: 'TOWN_DETAILS_SUCCESS',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'TOWN_DETAILS_FAIL',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}