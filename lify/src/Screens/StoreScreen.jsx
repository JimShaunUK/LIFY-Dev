import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../Components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../Actions/productActions'
import Loader from '../Components/Loader'
import Town from '../Components/Town'

const HomeScreens = ({ location, history, match }) => {
    //const [products, setProducts] = useState([])

    const [latitude, SetLatitude] = useState(0)
    const [longitude, SetLongitude] = useState(0)

    //for search bar
    const keyword = match.params.keyword

    var options = {
        enableHighAccuracy: false,
    };


    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {

        dispatch(listProducts(keyword, latitude, longitude))

    }, [dispatch, keyword])


    const locationHandler = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }

    function showPosition(position) {
        SetLatitude(position.coords.latitude)
        SetLongitude(position.coords.longitude)
        dispatch(listProducts(keyword, latitude, longitude))
    }

    return (
        <>

            {loading && <Loader />}
            {Array.isArray(products) ? (
                <>
                    <h1 className="py-3 text-center">available products</h1>
                    <Row>

                        {products.map(product => (
                            <Col sm={12} md={6} lg={4}>
                                <Product product={product} />
                            </Col>
                        ))}

                    </Row>
                </>
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
