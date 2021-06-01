import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../Actions/productActions'
import { townDetails } from '../Actions/townActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Product from '../Components/Product'


const StoreScreen = ({ location, history, match }) => {


    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const TownDetails = useSelector(state => state.townDetails)
    const { town } = TownDetails

    const btnStyle = {
        display: 'block',
        backgroundColor: 'black',
        color: 'white',
        fontFamily: 'arial',
        letterSpacing: '0.2rem',
        borderRadius: "0",
        margin: 'auto',
    }



    useEffect(() => {
        dispatch(townDetails(match.params.id))
        dispatch(listProducts(match.params.id))


    }, [dispatch, match])


    return (
        <>

            {products ? (
                <div>
                    {town ? (
                        <img className="w-100" src={town.image} alt="town banner"></img>
                    ) : (
                        <Loader />
                    )}
                    <h1 className="py-3 text-center">all cooperative products</h1>
                    <Row className='justify-content-center'>
                        <Col xs={8}>
                            <Link to={`/town/retailers/${match.params.id}`}>
                                <div style={btnStyle} className="btn my-4">browse retailers</div>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        {loading && <Loader />}
                        {products.map(product => (
                            <Col className="p-0" xs={6} md={6} lg={4}>
                                <Product product={product} />
                            </Col>
                        ))}

                    </Row>


                </div>
            ) : (
                <Message>{error}</Message>
            )}

        </>
    )
}

export default StoreScreen
