export const townListReducer = (state = {towns: []}, action)=>{
    switch (action.type){
        case 'TOWN_LIST_REQUEST':
            return {loading:true, towns:[]}
        case 'TOWN_LIST_SUCCESS':
            return {loading:false, towns: action.payload}
        case 'TOWN_LIST_FAIL':
            return {loading:false, error: action.payload}
        default:
            return state
    }
}

export const townDetailsReducer = (state = {town: {}}, action)=>{
    switch (action.type){
        case 'TOWN_DETAILS_REQUEST':
            return {loading:true, town:{}}
        case 'TOWN_DETAILS_SUCCESS':
            return {loading:false, town: action.payload}
        case 'TOWN_DETAILS_FAIL':
            return {loading:false, error: action.payload}
        default:
            return state
    }
}