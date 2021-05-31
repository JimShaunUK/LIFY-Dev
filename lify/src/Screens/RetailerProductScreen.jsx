import React, { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { listProductsByRetailer } from '../Actions/productActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Product from '../Components/Product'


const RetailerProductScreen = ({ history, match }) => {


    const dispatch = useDispatch()

    const productListByRetailer = useSelector(state => state.productListByRetailer)
    const { loading, error, products } = productListByRetailer

    const { store, location } = products




    useEffect(() => {

        dispatch(listProductsByRetailer(match.params.id))


    }, [dispatch, match])



    const linkStyle = {
        textDecoration: 'underline'
    }

    return (
        <>

            {store && <img className="w-100" src={store.image} alt={store.name} />}


            {error && <Message>{error}</Message>}


            {loading && <Loader />}

            {products.products ? (
                <div>


                    {location ? (
                        <Container>
                            <Row className='justify-content-center'>


                                <Col className="text-center" xs={6}>
                                    <Link to={`/town/products/${location._id}`}>
                                        <div style={linkStyle} className="btn my-2 shop-link">browse town products</div>
                                    </Link>
                                </Col>
                                <Col className="text-center" xs={6}>
                                    <Link to={`/town/retailers/${location._id}`}>
                                        <div style={linkStyle} className="btn my-2 shop-link">browse town retailers</div>
                                    </Link>
                                </Col>

                            </Row>
                        </Container>
                    ) : (<p>nope</p>)}

                    <Row>
                        {products.products.map(product => (
                            <Col className="p-0" xs={12} md={6} lg={4}>
                                <Product product={product} />
                            </Col>
                        ))}

                    </Row>


                </div>
            ) : (
                <Message>{error}</Message>
            )
            }

        </>
    )
}

export default RetailerProductScreen
