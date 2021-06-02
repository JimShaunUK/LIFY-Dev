import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroupItem, Image, Form, Button, ListGroup, Card, Container } from 'react-bootstrap'
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

        if (!userInfo || userInfo.length === 0) {

            history.push('/register')
        }
        else {
            history.push('/review/order')
        }
    }

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
            <Row className="justify-content-center">

                <Col xs={8}>

                    <p className="checkout-text my-3">Not done? <Link className="underline shop-link-lg my-3" onClick={goBack}>Continue Shopping</Link></p>
                </Col>
            </Row>
            <Row className="justify-content-center">

                <Col xs={10}>

                    <h2 className="shop-header-large py-3 text-center">my basket</h2>
                    {cart.cartItems.length === 0 ? (<h2 className="shop-header-large py-3 text-center">Your basket is empty!<Link className="btn btn-outline-primary rounded mx-3" onClick={goBack}>Back to Shop?</Link></h2>
                    ) : (
                        <ListGroup variant="flush">

                            {cart.cartItems.map(item => (
                                <ListGroupItem key={item.product}>
                                    <Row>
                                        <Col xs={2} md={3}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col xs={2} md={3}>
                                            <h3 className="checkout-link-lg mt-4" ><Link to={`/product/${item.product}`}>{item.name}</Link></h3>
                                        </Col>
                                        <Col xs={2} md={2}>
                                            <p className="checkout-text-lg mt-4">£{item.price}</p>
                                        </Col>
                                        <Col xs={2} md={2}>
                                            <Form.Control className="mt-3" as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {
                                                    [...Array(item.stock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1}> {x + 1}</option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                        <Col xs={2} md={2}>
                                            <Button
                                                type="button"
                                                style={btnStyle}
                                                className="btn mt-4 p-1 w-100"
                                                onClick={() => removeFromCartHandler(item.product)}>

                                                X
                                             </Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>

                            ))}



                        </ListGroup>

                    )


                    }
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col xs={10} md={8}>
                    <Card className="mt-3 rounded">
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h3 className="shop-header-large py-3 text-center">Subtotal ({cart.cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items: £{cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</h3>
                                <p></p>

                            </ListGroupItem>
                            <ListGroupItem>

                                <Button
                                    style={btnStyle}
                                    type="button"
                                    className=" w-100"
                                    disabled={cart.cartItems.length === 0}
                                    onClick={checkOutHandler}
                                >Proceed to Checkout!</Button>


                            </ListGroupItem>

                        </ListGroup>
                    </Card>
                </Col>

            </Row >
        </>
    )
}

export default CartScreen