import axios from 'axios'

export const addToCart = (id, qty) => async (dispatch, getState)=>{
    const {data} = await axios.get(`/api/products/view/${id}`)

    dispatch({
        type:'CART_ADD_ITEM',
        payload:{
            product: data._id,
            name: data.name,
            image: data.image,
            price:data.price,
            stock: data.stock,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) =>{
    dispatch({
        type:'CART_REMOVE_ITEM',
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveShippingAddress = (data) => (dispatch) =>{
    dispatch({
        type:'CART_SAVE_SHIPPING_ADDRESS',
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) =>{
    dispatch({
        type:'CART_SAVE_PAYMENT_METHOD',
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export const createOrder = (data) => (dispatch) =>{
    dispatch({
        type:'CREATE_ORDER_MANIFEST',
        payload: data,
    })

    localStorage.setItem('lifyOrder', JSON.stringify(data))
}

export const removeOrder = (data) => (dispatch) =>{
    dispatch({
        type:'REMOVE_ORDER_MANIFEST',
        payload: data,
    })

    localStorage.removeItem('lifyOrder')
}

export const removeCart = (data) => (dispatch) =>{
    dispatch({
        type:'CART_CLEAR_ITEMS',
        payload: data,
    })

    localStorage.removeItem('cartItems')
}