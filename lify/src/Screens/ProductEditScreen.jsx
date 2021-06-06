import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, FormControl, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct } from '../Actions/productActions'
import FormContainer from '../Components/FormContainer'
import { listRetailerOwnerDetails } from '../Actions/retailerActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

import axios from 'axios'




const ProductEditScreen = ({ match, history }) => {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [image, setImage] = useState('')
    const [canDeliver, setCanDeliver] = useState(false)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)


    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const retailerDetailsOwner = useSelector(state => state.retailerDetailsOwner)
    const { retailerDetail, loading: loadingRDetails, error: errorRDetails } = retailerDetailsOwner


    const productUpdate = useSelector(state => state.productUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate
    } = productUpdate


    const btnStyle = {
        display: 'block',
        backgroundColor: 'black',
        color: 'white',
        fontFamily: 'arial',
        letterSpacing: '0.2rem',
        borderRadius: "0",
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        display: 'block'
    }

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: 'PRODUCT_UPDATE_RESET' })
            history.push('/retailer/productList')

        }
        else {

            if (!product.name) {
                dispatch(listProductDetails(productId))
                dispatch(listRetailerOwnerDetails(userInfo._id))
            }
            else {
                setName(product.name)
                setPrice(product.price)

                setStock(product.stock)
                setImage(product.image)
                setDescription(product.description)
            }
        }

    }, [dispatch, history, productId, product, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        }
        catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct(
            {
                _id: productId,
                name,
                price,
                canDeliver,
                stock,
                image,
                description
            }
        ))
    }

    return (
        <>
            {loadingRDetails ? (<Loader />) : (
                <>
                    <img className="w-100" src={retailerDetail.image} alt="account banner"></img>


                </>
            )}
            <Container>
                <Link to="/retailer/productList" style={btnStyle} className="btn my-3">Back to All Products</Link>

                <FormContainer>
                    <h1 className='shop-header-large py-3 text-center'>Edit Product</h1>
                    {loadingUpdate && <Loader />}
                    {errorUpdate && <Message varient='danger'>{errorUpdate}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading ? <Loader /> :
                        (

                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='name'>
                                    <h4 className="checkout-text text-center py-3">product display name</h4>
                                    <FormControl
                                        type='name'
                                        placeholder={product.name}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></FormControl>
                                </Form.Group>
                                <Form.Group controlId='price'>
                                    <h4 className="checkout-text text-center py-3">set price</h4>
                                    <FormControl
                                        type='number'
                                        placeholder={product.price}
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    ></FormControl>
                                </Form.Group>

                                <Form.Group controlId='image'>
                                    <h4 className="checkout-text text-center py-3">image upload</h4>
                                    <FormControl
                                        type='text'
                                        placeholder={product.image}
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    ></FormControl>
                                    <br>
                                    </br>
                                    <p>OR</p>
                                    <Form.File
                                        id='image-file'
                                        label='Upload file...'
                                        custom
                                        onChange={uploadFileHandler}>

                                    </Form.File>
                                    {uploading && <h3>Loading...</h3>}
                                </Form.Group>



                                <Form.Group controlId='stock'>
                                    <h4 className="checkout-text text-center py-3">stock level</h4>
                                    <FormControl
                                        type='number'
                                        placeholder={product.stock}
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    ></FormControl>
                                </Form.Group>

                                <Form.Group controlId='description'>
                                    <h4 className="checkout-text text-center py-3">product description</h4>
                                    <FormControl
                                        type='text'
                                        placeholder={product.description}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></FormControl>
                                </Form.Group>
                                <Form.Group controlId='canDeliver'>
                                    <h4 className="checkout-text text-center py-3">can it be delivered?</h4>
                                    <FormControl
                                        type='text'
                                        placeholder='No'
                                        onChange={(e) => setCanDeliver(e.target.value)}
                                        as="select">
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </FormControl>
                                </Form.Group>

                                <Button
                                    type='submit'
                                    style={btnStyle}
                                    className="w-100 my-3">save changes</Button>


                            </Form>
                        )}



                </FormContainer>
            </Container>
        </>

    )
}

export default ProductEditScreen