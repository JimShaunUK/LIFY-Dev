import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroupItem, Image, Form, Button, ListGroup, Card, Container, FormControl } from 'react-bootstrap'
import { saveShippingAddress, addToCart, removeFromCart, createOrder } from '../Actions/cartActions'
import CheckoutProgressBar from '../Components/CheckoutProgressBar'
import FormContainer from '../Components/FormContainer'
import Message from '../Components/Message'

import DatePicker from 'react-date-picker'


const ReviewOrderScreen = ({ match, location, history }) => {

    const productId = match.params.id

    //whatever is in the url after the ? will store in qty
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    //console.log(qty)

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const userInfo = useSelector(state => state.userLogin.userInfo)


    const { shippingAddress } = cart
    const { cartItems } = cart
    const [name, setName] = useState(userInfo.name)
    const [email, setEmail] = useState(userInfo.email)
    const [address, setAddress] = useState(userInfo.address)

    const [streetAddress, setStreetAddress] = useState()
    const [town, setTown] = useState()
    const [county, setCounty] = useState()
    const [postcode, setPostcode] = useState()
    const [delivery, setDelivery] = useState(false)
    const [deliveryFee, setDeliveryFee] = useState(0)
    const [startDate, setStartDate] = useState(new Date())

    const [message, setMessage] = useState(null)



    useEffect(() => {
        //setMessage('Basket Empty!')
        setStartDate(new Date(Date.now() + (3600 * 1000 * 24)))

        if (productId) {
            dispatch(addToCart(productId, qty))
        }

        if (userInfo) {
            const addressData = address.split(',')
            setStreetAddress(addressData[0])
            setTown(addressData[1])
            setCounty(addressData[2])
            setPostcode(addressData[3])
        }

        //alert(delivery)

    }, [dispatch, userInfo, productId, qty, delivery])



    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const deliveryOption = (e) => {

        if (e === true) {
            setDelivery('true')
            setDeliveryFee(0)

        }
        else {
            setDelivery('false')
            setDeliveryFee(3)

        }
    }





    const submitHandler = () => {

        let billingAddress = `${streetAddress}, ${town}, ${county}`
        const totalPrice = Number(cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) + deliveryFee + 3).toFixed(2)
        let PostCode = `${postcode}`
        dispatch(saveShippingAddress({ name, email, billingAddress, delivery, deliveryFee, startDate }))
        dispatch(createOrder({ name, email, billingAddress, PostCode, totalPrice, cartItems, delivery, deliveryFee }))

        history.push('/review/order/pay')
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
            <Container>
                <Row className="justify-content-center">
                    <Col xs={10}>
                        <CheckoutProgressBar val={60} />
                    </Col>
                </Row>
            </Container>
            <Row className="justify-content-center" >

                <Col xs={10}>

                    <h2 className="shop-header-large py-3 text-center">review order</h2>
                    {cart.cartItems.length === 0 ? (<h2>Your basket is empty!<Link className="btn btn-warning rounded mx-3" onClick={goBack}>Back to Shop?</Link></h2>
                    ) : (
                        <ListGroup variant="flush">

                            {cart.cartItems.map(item => (
                                <ListGroupItem key={item.product}>
                                    <Row>
                                        <Col xs={3} md={3}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col xs={3} md={3}>
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


                            <ListGroupItem>
                                <p className="checkout-text py-1">Not done?</p>
                                <Link style={btnStyle} className="btn mx-3" onClick={goBack}>Continue Shopping</Link>
                            </ListGroupItem>
                        </ListGroup>

                    )


                    }
                </Col>
            </Row>
            <Row className="justify-content-center">

                <Col className="text-center" xs={8}>


                    <h3 className="shop-header py-3">Subtotal ({cart.cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items: £{cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</h3>


                </Col>
            </Row>

            <Row>
                <Container>
                    <FormContainer>
                        <h2 className="shop-header-large py-3 text-center">confirm shipping/billing</h2>
                        <h4 className="checkout-text text-center">this is your billing and shipping address</h4>

                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <FormControl
                                    type='name'
                                    placeholder='Enter name...'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></FormControl>
                            </Form.Group>



                            <Form.Group controlId='streetAddress'>
                                <Form.Label>Street Address</Form.Label>
                                <FormControl
                                    type='streetAddress'
                                    placeholder='Enter street address...'
                                    value={streetAddress}
                                    onChange={(e) => setStreetAddress(e.target.value)}
                                ></FormControl>
                            </Form.Group>

                            <Form.Group controlId='town'>
                                <Form.Label>Town</Form.Label>
                                <FormControl
                                    type='town'
                                    placeholder='Enter town...'
                                    value={town}
                                    onChange={(e) => setTown(e.target.value)}
                                ></FormControl>
                            </Form.Group>

                            <Form.Group controlId='county'>
                                <Form.Label>County</Form.Label>
                                <FormControl
                                    type='county'
                                    placeholder='Enter county...'
                                    value={county}
                                    onChange={(e) => setCounty(e.target.value)}
                                ></FormControl>
                            </Form.Group>


                            <Form.Group controlId='postcode'>
                                <Form.Label>Postcode</Form.Label>
                                <FormControl
                                    type='postcode'
                                    placeholder='Enter postcode...'
                                    value={postcode}
                                    onChange={(e) => setPostcode(e.target.value)}
                                ></FormControl>
                            </Form.Group>

                            <Form.Group controlId='delivery'>
                                <Form.Label>Select Delivery Method</Form.Label>

                                <Col>
                                    <Form.Check
                                        type='radio'
                                        label='Collection from store'
                                        id='Stripe'
                                        name='delivery'
                                        value={false}
                                        checked
                                        onClick={(e) => deliveryOption(e.target.value)}
                                    ></Form.Check>
                                    <Form.Check
                                        type='radio'
                                        label='Bicycle Delivery'
                                        name='delivery'
                                        value={true}
                                        onClick={(e) => deliveryOption(e.target.value)}
                                    ></Form.Check>
                                </Col>
                            </Form.Group>

                            <Form.Group>

                                <DatePicker
                                    className="w-100 py-3"
                                    onChange={setStartDate}
                                    value={startDate}
                                    minDate={startDate}
                                    disableCalendar={false}
                                    showLeadingZeros={true}
                                />


                            </Form.Group>
                            <Form.Group >
                                <Col className='my-2 text-right'>
                                    <h2 className="shop-header py-3 ">Delivery fee: £{deliveryFee}</h2>
                                    <h4 className="shop-text ">this is calculated at a flat rate</h4>
                                </Col>


                            </Form.Group>

                            <Form.Group className='my-2 text-center'>
                                {message && <Message variant='danger'>{message}</Message>}
                            </Form.Group>

                            <Button
                                type='submit'
                                className="w-100 mt-3"
                                style={btnStyle}
                            >proceed to payment</Button>


                        </Form>
                    </FormContainer>
                </Container>
            </Row>





        </>
    )
}

export default ReviewOrderScreen