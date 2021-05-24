import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../Actions/productActions'
import Loader from '../Components/Loader'
//replaced by backend
//import products from '../products'
//replaced by redux
//import axios from 'axios'

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {

        dispatch(listProductDetails(match.params.id))

    }, [dispatch, match.params])


    //add to cart handler function
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }


    return (
        <div>
            <Container>
                <Link className='btn btn-outline-warning my-3 rounded' to='/store'>Back to Shop</Link>
                {loading ? <Loader /> : error ? <h3>{error}</h3> : (
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid></Image>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>{product.name}</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h3>By {product.artist}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: £{product.price}
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
                                            className="btn-block btn-warning rounded"
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
