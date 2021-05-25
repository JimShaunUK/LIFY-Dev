import React, { useState, useEffect } from 'react'
import { Row, Col, Modal, Button } from 'react-bootstrap'
import Product from '../Components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../Actions/productActions'
import { listRetailers } from '../Actions/retailerActions'
import Loader from '../Components/Loader'
import Town from '../Components/Town'
import Retailer from '../Components/Retailer'

const HomeScreens = ({ location, history, match }) => {
    //const [products, setProducts] = useState([])

    const [latitude, SetLatitude] = useState(0)
    const [longitude, SetLongitude] = useState(0)
    const [authLocation, SetAuthLocation] = useState(false)
    const [locationIsLoading, SetLocationIsLoading] = useState(false)
    const [viewRetailers, SetViewRetailers] = useState(false)
    //for search bar
    const keyword = match.params.keyword

    var options = {
        enableHighAccuracy: false,
    };


    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const retailerList = useSelector(state => state.retailerList)
    const { loading: retailLoading, error: retailError, retailers } = retailerList

    useEffect(() => {

        dispatch(listProducts(keyword, latitude, longitude))
        dispatch(listRetailers(keyword, latitude, longitude))

    }, [dispatch, keyword])


    const locationHandler = () => {
        SetLocationIsLoading(true)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
            SetAuthLocation(true)
        }
    }

    function showPosition(position) {
        SetLatitude(position.coords.latitude)
        SetLongitude(position.coords.longitude)
        SetLocationIsLoading(false)
        //dispatch(listProducts(keyword, latitude, longitude))
    }

    function Reload() {
        SetAuthLocation(false)
        dispatch(listProducts(keyword, latitude, longitude))
        dispatch(listRetailers(keyword, latitude, longitude))
    }



    return (
        <>


            <Modal show={authLocation}>

                {locationIsLoading ? (
                    <Modal.Body>
                        <div className="shop-header text-center py-5">
                            <p className="shop-text">finding your area!</p>
                            <Loader />
                        </div>
                        <Modal.Footer>
                            <Button variant="danger btn btn-block" onClick={() => SetAuthLocation(false)}>forget it!</Button>
                        </Modal.Footer>
                    </Modal.Body>
                ) : (

                    <Modal.Body>
                        <iframe
                            title="map"
                            src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBVidQMyEBxQ_5GYdgjww7Pd3jsgXZ8gUw&center=${String(latitude)},${String(longitude)}&zoom=14`}
                            className="w-100"
                            height="400"
                            frameBorder="0"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            aria-hidden="false"
                            tabIndex="0"
                        />
                        <Modal.Footer className="">
                            <div className="btn btn-primary m-auto" block onClick={Reload}>show me products!</div>
                        </Modal.Footer>
                    </Modal.Body>

                )}

            </Modal>

            <p>{latitude}</p>
            <p>{longitude}</p>

            {loading && <Loader />}

            {Array.isArray(products) ? (


                <div>
                    {!viewRetailers ? (
                        <div>
                            <h1 className="py-3 text-center">available products</h1>
                            <Row>
                                <Col md={6}><div className="btn btn-primary mx-5" onClick={() => SetViewRetailers(false)}>just show me products</div></Col>
                                <Col md={6}><div className="btn btn-primary mx-5" onClick={() => SetViewRetailers(true)}>just show me shops</div></Col>
                            </Row>
                            <Row>

                                {products.map(product => (
                                    <Col sm={12} md={6} lg={4}>
                                        <Product product={product} />
                                    </Col>
                                ))}

                            </Row>


                        </div>
                    ) : (
                        <div>
                            <h1 className="py-3 text-center">available retailers</h1>
                            <Row>
                                <Col md={6}><div className="btn btn-primary btn-block mx-5" onClick={() => SetViewRetailers(false)}>just show me products</div></Col>
                                <Col md={6}><div className="btn btn-primary mx-auto mx-5" onClick={() => SetViewRetailers(true)}>just show me shops</div></Col>
                            </Row>
                            <Row>

                                {retailers.map(retailer => (
                                    <Col sm={12} md={12} lg={6}>
                                        <Retailer retailer={retailer} />
                                    </Col>
                                ))}

                            </Row>
                        </div>

                    )}
                </div>

            ) : (
                <>
                    <h1 className="py-3 text-center">our cooperative towns</h1>
                    <Row>
                        <p>{products.message}</p>

                        <div className="btn btn-primary" onClick={locationHandler}>Share my Location</div>

                        {products.products.map(product => (
                            <Col sm={12} md={6} lg={4}>
                                <Town product={product} />
                            </Col>
                        ))}

                    </Row>
                </>
            )}


        </>
    )
}

export default HomeScreens
