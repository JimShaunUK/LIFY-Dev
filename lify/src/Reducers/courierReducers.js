export const courierListReducer = (state = {orders:[]}, action) =>{

    switch(action.type){
        case 'COURIER_LIST_REQUEST':
            return{
                loading:true
            }
        case 'COURIER_LIST_SUCCESS':
            return{
                loading:false,
                orders: action.payload
            }
        case 'COURIER_LIST_FAIL':
            return{
                loading:false,
                error: action.payload
            }
        case 'COURIER_LIST_RESET':
            return{
                orders:[]
            }
        default:
            return state
    }

}

export const courierAcceptReducer = (state = {order:{}}, action)=>{
    switch (action.type){
        case 'COURIER_ACCEPT_REQUEST':
            return {loading:true}
        case 'COURIER_ACCEPT_SUCCESS':
            return {loading:false, success:true, order: action.payload}
        case 'COURIER_ACCEPT_FAIL':
            return {loading:false, error: action.payload}
        case 'COURIER_ACCEPT_RESET':
            return {order:{}}
        default:
            return state
    }
}

export const getDeliveryDataReducer = (state = {delivery:[]}, action)=>{
    switch (action.type){
        case 'DELIVERY_DATA_REQUEST':
            return {loading:true}
        case 'DELIVERY_DATA_SUCCESS':
            return {loading:false, delivery: action.payload}
        case 'DELIVERY_DATA_FAIL':
            return {loading:false, error: action.payload}
        case 'DELIVERY_DATA_RESET':
            return {delivery:[]}
        default:
            return state
    }
}

export const deliveryCompleteReducer = (state = {response:{}}, action)=>{
    switch (action.type){
        case 'DELIVERY_COMPLETE_REQUEST':
            return {loading:true}
        case 'DELIVERY_COMPLETE_SUCCESS':
            return {loading:false, success:true, info:action.payload}
        case 'DELIVERY_COMPLETE_FAIL':
            return {loading:false, error: action.payload}
        case 'DELIVERY_COMPLETE_RESET':
            return {response:{}}
        default:
            return state
    }
}