import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroupItem, Image, Form, Button, ListGroup, Card } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../Actions/cartActions'


const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id

    //whatever is in the url after the ? will store in qty
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    //console.log(qty)

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const userInfo = useSelector(state => state.userLogin.userInfo)



    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {

        if (userInfo.length === 0 || !userInfo) {

            history.push('/register')
        }
        else {
            history.push('/review/order')
        }
    }

    const goBack = () => {
        history.goBack()
    }

    return (
        <Row>
            <Col md={8}>
                <h1 className="py-3">Your Basket</h1>
                {cart.cartItems.length === 0 ? (<h2>Your basket is empty!<Link className="btn btn-warning rounded mx-3" onClick={goBack}>Back to Shop?</Link></h2>
                ) : (
                    <ListGroup variant="flush">
                        {cart.cartItems.map(item => (
                            <ListGroupItem key={item.product}>
                                <Row>
                                    <Col xs={12} md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <h3><Link to={`/product/${item.product}`}>{item.name}</Link></h3>
                                    </Col>
                                    <Col xs={12} md={2}>
                                        <p>£{item.price}</p>
                                    </Col>
                                    <Col xs={12} md={2}>
                                        <Form.Control className="mt-3" as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {
                                                [...Array(item.stock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}> {x + 1}</option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col xs={12} md={2}>
                                        <Button type="button" variant='outline-warning' className="btn btn-block rounded mt-3 p-1" onClick={
                                            () => removeFromCartHandler(item.product)
                                        }><span class="material-icons icon-trash">
                                                delete
                                                </span></Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>

                        ))}
                        <ListGroupItem>
                            <p>Not done? <Link className=" btn btn-outline-warning rounded mx-3" onClick={goBack}>Continue Shopping</Link></p>
                        </ListGroupItem>


                    </ListGroup>
                )


                }
            </Col>
            <Col md={4}>
                <Card className="mt-3 rounded">
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h3>Subtotal ({cart.cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items:</h3>
                            <p>£{cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</p>

                        </ListGroupItem>
                        <ListGroupItem>

                            <Button
                                type="button"
                                className="btn-block btn-warning"
                                disabled={cart.cartItems.length === 0}
                                onClick={checkOutHandler}
                            >Proceed to Checkout!</Button>


                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>

        </Row>
    )
}

export default CartScreen