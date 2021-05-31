import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../Actions/productActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'



const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const { store, townData } = product

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))


    }, [dispatch, match])


    //add to cart handler function
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
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
        textDecoration: 'none'
    }

    const linkStyle = {
        textDecoration: 'underline'
    }

    return (
        <div>
            {store && <img className="w-100" src={store.image} alt={store.name} />}
            <Container>

                {error && <Message>{error}</Message>}
                {townData ? (
                    <Row className='justify-content-center'>

                        <Col xs={12}>
                            <Link to={`/town/retailer/products/${store._id}`}>
                                <div style={btnStyle} className="btn my-2">browse all {store.name} products</div>
                            </Link>
                        </Col>
                        <Col className="text-center" xs={6}>
                            <Link to={`/town/products/${townData._id}`}>
                                <div style={linkStyle} className="btn my-2 shop-link">browse town products</div>
                            </Link>
                        </Col>
                        <Col className="text-center" xs={6}>
                            <Link to={`/town/retailers/${townData._id}`}>
                                <div style={linkStyle} className="btn my-2 shop-link">browse town retailers</div>
                            </Link>
                        </Col>

                    </Row>
                ) : (<p>nope</p>)}

                {loading ? <Loader /> : error ? <h3>{error}</h3> : (

                    <Row>

                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid></Image>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2 className="shop-header-large">{product.name}</h2>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <b>£{product.price}</b>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col><strong>£{product.price}</strong></Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>{product.stock > 0 ? 'In Stock!' : 'Out of Stock!'}</Col>
                                        </Row>
                                    </ListGroupItem>
                                    {product.stock > 0 && (
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                        {
                                                            [...Array(product.stock).keys()].map(x => (
                                                                <option key={x + 1} value={x + 1}> {x + 1}</option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    )}

                                    <ListGroupItem>
                                        <Button
                                            onClick={addToCartHandler}
                                            style={btnStyle}
                                            type="button"
                                            disabled={product.stock === 0}
                                        >Add to Cart</Button>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                )}

            </Container>
        </div>


    )
}

export default ProductScreen
