import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductsManage, deleteProduct, createProduct } from '../Actions/productActions'
import { listRetailerOwnerDetails } from '../Actions/retailerActions'
import Loader from '../Components/Loader'

const ProductListScreen = ({ history, match }) => {

    const dispatch = useDispatch()

    const productManageList = useSelector(state => state.productManageList)
    const { loading, error, products } = productManageList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const retailerDetailsOwner = useSelector(state => state.retailerDetailsOwner)
    const { retailerDetail, loading: loadingRDetails, error: errorRDetails } = retailerDetailsOwner

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


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

    const btnDangerStyle = {
        display: 'block',
        backgroundColor: 'red',
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

        dispatch({ type: 'PRODUCT_CREATE_RESET' })

        if (!userInfo.isRetailer) {
            history.push('/login')
        }

        if (!retailerDetail || !retailerDetail.name) {
            dispatch(listRetailerOwnerDetails(userInfo._id))
        }

        if (successCreate) {
            history.push(`/retailer/product/${createdProduct._id}/edit`)
        }
        else {
            dispatch(listProductsManage())
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure? Deletion is Permanent!')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())

    }

    return (
        <>
            {loadingRDetails ? (<Loader />) : (
                <>
                    <img className="w-100" src={retailerDetail.image} alt="account banner"></img>


                </>
            )}
            <Row className='align-items-center'>
                <Col>
                    <h1 className="shop-header-large py-3 text-center">Product Manager Dashboard</h1>
                </Col>
            </Row>

            <Container>
                <Row className='justify-center'>
                    <Col xs={8} className='text-right'>
                        <Button style={btnStyle} className='my-3' onClick={createProductHandler}>
                            Create New Product
                    </Button>
                    </Col>
                </Row>
                {loadingDelete && <h2>Loading...</h2>}
                {errorDelete && <h2 className="messsage-alert">{errorDelete}.</h2>}
                {loadingCreate && <h2>Loading...</h2>}
                {errorCreate && <h2 className="messsage-alert">{errorCreate}.</h2>}
                {loading ? <h2>Loading...</h2> : error ? <h3>{error}</h3>
                    :
                    (<Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id.slice(-6)}</td>
                                    <td>{product.name}</td>
                                    <td>£{product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.description}</td>
                                    <td>
                                        <Link to={`/retailer/product/${product._id}/edit`}>
                                            <Button style={btnStyle} className='btn-sm w-100'>
                                                edit
                                            </Button>
                                        </Link>
                                        <Button
                                            style={btnDangerStyle}
                                            className='btn-sm w-100'
                                            onClick={() => { deleteHandler(product._id) }}><span class="material-icons">
                                                delete
                                        </span>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>)}
            </Container>
        </>
    )
}

export default ProductListScreen