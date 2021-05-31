import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { listRetailers } from '../Actions/retailerActions'
import { townDetails } from '../Actions/townActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Retailer from '../Components/Retailer'


const RetailerScreen = ({ location, history, match }) => {


    const dispatch = useDispatch()

    const retailerList = useSelector(state => state.retailerList)
    const { loading, error, retailers } = retailerList

    const TownDetails = useSelector(state => state.townDetails)
    const { town } = TownDetails

    const btnStyle = {
        display: 'block',
        backgroundColor: 'black',
        color: 'white',
        fontFamily: 'arial',
        letterSpacing: '0.2rem',
        borderRadius: "0",
        alignItems: 'center',
        justifyContent: 'center',

    }


    useEffect(() => {
        dispatch(townDetails(match.params.id))
        dispatch(listRetailers(match.params.id))


    }, [dispatch, match])


    return (
        <>



            {loading && <Loader />}

            {retailers ? (
                <div>
                    {town ? (
                        <img className="w-100" src={town.image} alt="town banner"></img>
                    ) : (
                        <Loader />
                    )}
                    <h1 className="py-3 text-center">our partner retailers</h1>
                    <Row className='justify-content-center'>
                        <Col xs={8}>
                            <Link to={`/town/products/${match.params.id}`}>
                                <div style={btnStyle} className="btn my-4">browse products</div>
                            </Link>
                        </Col>
                    </Row>
                    <Row>

                        {retailers.map(retailer => (
                            <Col className="p-0" xs={12} md={6} lg={4}>
                                <Retailer retailer={retailer} />
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

export default RetailerScreen
