import React, { useEffect } from 'react'
import { Button, Row, Col, Container } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { searchProducts } from '../Actions/productActions'
import Product from '../Components/Product'
import Retailer from '../Components/Retailer'
import Town from '../Components/Town'


import Loader from '../Components/Loader'
import Message from '../Components/Message'

const ResultsScreen = ({ match, history }) => {
    //for search bar
    const keyword = match.params.keyword


    const dispatch = useDispatch()

    const searchAll = useSelector(state => state.searchAll)
    const { loading, error, result } = searchAll
    const { products, towns, retailers } = useSelector(state => state.searchAll.result)
    useEffect(() => {

        dispatch(searchProducts(keyword))

    }, [dispatch, keyword])

    const goBack = () => {
        history.goBack()
    }

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

    return (
        <>
            {loading ? (<Loader />) : (
                <Container>
                    <h1 className="shop-header-large py-3 text-center">Here's what we can find for "{keyword}"</h1>
                    <h1 className="shop-header py-3 text-center">This is what "{keyword}" turned up in our partners product ranges</h1>
                    <Row>


                        {!products ? (<Message>No Results, sorry!</Message>)
                            : (

                                products.map(product => (
                                    <Col className="p-0" xs={6} md={6} lg={4}>
                                        <Product product={product} />
                                    </Col>
                                ))

                            )}


                    </Row>
                    <h1 className="shop-header py-3 text-center">These are the retailers that might respond to being called "{keyword}"</h1>
                    <Row>

                        <>
                            {!retailers ? (<Message>No Results, sorry!</Message>)
                                : (

                                    retailers.map(retailer => (
                                        <Col className="p-0" xs={6} md={6} lg={4}>
                                            <Retailer retailer={retailer} />
                                        </Col>
                                    ))

                                )}

                        </>


                    </Row>
                    <Row>
                        <h1 className="shop-header py-3 text-center">And just in case, these our our partner locations that go by "{keyword}"</h1>

                        <>
                            {!towns ? (<Message>No Results, sorry!</Message>)
                                : (

                                    towns.map(town => (
                                        <Col className="p-0" xs={3}>
                                            <Town town={town} />
                                        </Col>
                                    ))

                                )}

                        </>
                    </Row>
                    <Row>
                        <p className="shop-header py-3 text-center">can't find what you need?</p>
                        <Button onClick={goBack} type="submit" style={btnStyle} className=" w-100">
                            Search again?
                            </Button>
                    </Row>

                </Container>
            )}
        </>
    )

}

export default ResultsScreen
