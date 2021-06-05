import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct } from '../Actions/productActions'
import FormContainer from '../Components/FormContainer'

import axios from 'axios'




const ProductEditScreen = ({ match, history }) => {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate
    } = productUpdate




    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: 'PRODUCT_UPDATE_RESET' })
            history.push('/admin/productList')

        }
        else {

            if (!product.name || product.id !== product._id) {
                dispatch(listProductDetails(productId))
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

                stock,
                image,
                description
            }
        ))
    }

    return (
        <>
            <Link to="/retailer/productList" className="btn btn-warning my-3">Back to All Products</Link>

            <FormContainer>
                <h1 className='py-3'>Edit Product</h1>
                {loadingUpdate && <h2>Loading...</h2>}
                {errorUpdate && <h2 className="message-alert">{errorUpdate}</h2>}
                {error && <h2 className="message-alert">{error}</h2>}
                {loading ? <h2>Loading...</h2> :
                    (

                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <FormControl
                                    type='name'
                                    placeholder={product.name}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></FormControl>
                            </Form.Group>
                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <FormControl
                                    type='number'
                                    placeholder={product.price}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></FormControl>
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>Image Ref</Form.Label>
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
                                <Form.Label>Stock</Form.Label>
                                <FormControl
                                    type='number'
                                    placeholder={product.stock}
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                ></FormControl>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <FormControl
                                    type='text'
                                    placeholder={product.description}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></FormControl>
                            </Form.Group>

                            <Button
                                type='submit'
                                variant='primary'>Update</Button>


                        </Form>
                    )}



            </FormContainer>
        </>

    )
}

export default ProductEditScreen