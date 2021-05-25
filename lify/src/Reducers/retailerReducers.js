
export const retailerListReducer = (state = {retailers: []}, action)=>{
    switch (action.type){
        case 'RETAILER_LIST_REQUEST':
            return {loading:true, retailers:[]}
        case 'RETAILER_LIST_SUCCESS':
            return {loading:false, retailers: action.payload}
        case 'RETAILER_LIST_FAIL':
            return {loading:false, error: action.payload}
        default:
            return state
    }
}

export const retailerDetailsReducer = (state = {retailer: {}}, action)=>{
    switch (action.type){
        case 'RETAILER_DETAILS_REQUEST':
            return {loading:true, ...state}
        case 'RETAILER_DETAILS_SUCCESS':
            return {loading:false, retailer: action.payload}
        case 'RETAILER_DETAILS_FAIL':
            return {loading:false, error: action.payload}
        default:
            return state
    }
}

export const retailerDeleteReducer = (state = {}, action)=>{
    switch (action.type){
        case 'RETAILER_DELETE_REQUEST':
            return {loading:true}
        case 'RETAILER_DELETE_SUCCESS':
            return {loading:false, success:true}
        case 'RETAILER_DELETE_FAIL':
            return {loading:false, error: action.payload}
        default:
            return state
    }
}

export const retailerCreateReducer = (state = {}, action)=>{
    switch (action.type){
        case 'RETAILER_CREATE_REQUEST':
            return {loading:true}
        case 'RETAILER_CREATE_SUCCESS':
            return {loading:false, success:true, retailer: action.payload}
        case 'RETAILER_CREATE_FAIL':
            return {loading:false, error: action.payload}
        case 'RETAILER_CREATE_RESET':
            return {}
        default:
            return state
    }
}

export const retailerUpdateReducer = (state = {retailer:{}}, action)=>{
    switch (action.type){
        case 'RETAILER_UPDATE_REQUEST':
            return {loading:true}
        case 'RETAILER_UPDATE_SUCCESS':
            return {loading:false, success:true, retailer: action.payload}
        case 'RETAILER_UPDATE_FAIL':
            return {loading:false, error: action.payload}
        case 'RETAILER_UPDATE_RESET':
            return {retailer:{}}
        default:
            return state
    }
}
