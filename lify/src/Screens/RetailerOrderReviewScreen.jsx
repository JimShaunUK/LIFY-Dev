import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button, ListGroupItem, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { getOrderDetails, deliverOrder } from '../Actions/orderActions'

//stripe
import { Elements } from "@stripe/react-stripe-js"
import CreditCardForm from '../PaymentWidgets/CreditCardForm'
import { loadStripe } from "@stripe/stripe-js"
//import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

const RetailerOrderReviewScreen = ({ match, history }) => {

    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin



    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    //calculate prices
    if (!loading) {
        //round to two decimals
        const addDecimals = (num) => {
            return (Math.round(num * 100 / 100).toFixed(2))
        }

        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
        order.shippingPrice = addDecimals(5)
        order.handling = addDecimals(Number((order.itemsPrice * 0.0255).toFixed(2)))
        order.totalPrice = addDecimals((Number(order.itemsPrice) + Number(order.shippingPrice) + Number(order.handling)))
    }




    useEffect(() => {

        if (!userInfo || userInfo.length === 0) {
            history.push('/login')
        }



        if (!order || order._id !== orderId || successDeliver) {
            // dispatch({ type: ORDER_PAY_RESET })
            // dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        }



    }, [dispatch, order, orderId, successDeliver, history, userInfo])


    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }



    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
        :
        <>
            <img className="w-100" src={"/images/account.jpg"} alt="account banner" />
            <Container>

                <h1 className='shop-header-large py-4 text-center'>Your Order Reference: {(order._id).slice(-6)}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item className="checkout-text py-2">
                                <h3 className='shop-header-large py-3 text-center'>Shipping</h3>
                                <strong>Name:</strong>{order.user.name}<br></br>
                                <strong>Email: </strong><a href={`mailto:${userInfo.email}`}>{userInfo.email}</a><br></br>
                                <strong>Address: </strong>
                                {order.shippingAddress}, {order.postcode}
                                <br></br><br></br>
                                {order.isDelivered ? <Message variant="success">Dispatched on: {order.deliveredAt.substring(0, 10)}</Message> :
                                    <Message variant='danger'>order confirmed, but its not ready yet!</Message>}


                            </ListGroup.Item>

                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroupItem>
                                    <Button type="button" className="btn btn-block btn-primary" onClick={deliverHandler}>Mark as Dispatched</Button>
                                </ListGroupItem>
                            )}


                            <ListGroup.Item className="checkout-text">
                                <h3 className='shop-header-large py-3 text-center'>Review Items</h3>
                                {order.orderItems.length === 0 ? <Message>Order is empty!</Message> : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x £{item.price} = £{item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item className="checkout-text">
                                <h3 className='shop-header-large py-3 text-center'>Payment Method</h3>

                                <strong>Method: </strong>
                                {order.paymentMethod}<br>
                                </br>
                                <br></br>
                                {order.isPaid ? <Message variant="success">Payment Succeded on: {order.paidAt.substring(0, 10)}</Message> :
                                    <>
                                        <Message variant='danger'>Payment not yet Complete</Message>

                                        <Card border="primary" id="paymentWidgetContainerCard">


                                            <Card.Header>
                                                <Row>
                                                    <Col md="auto">
                                                        Pay Now by Card
                                                </Col>
                                                </Row>
                                            </Card.Header>


                                            <Card.Body>


                                                <Elements
                                                    stripe={loadStripe("pk_test_51IUavEFV3SCXvY9fubZHWbPtve3bWc9yFTuEM5Cx05OEblstUpwW67DwVEcYVMciTAFImsZeyshfX9MVQvGdftLQ00uES24w7o")}
                                                >
                                                    <CreditCardForm order={order} />
                                                </Elements>
                                            </Card.Body>
                                        </Card>






                                    </>}
                            </ListGroup.Item>


                        </ListGroup>
                    </Col>

                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <h2 className='shop-header-large py-4 text-center'>Order Summary</h2>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col className="checkout-text">Items</Col>
                                        <Col className="checkout-text">£ {order.itemsPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col className="checkout-text">delivery cost</Col>
                                        <Col className="checkout-text">£ {order.deliveryPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col className="checkout-text">processing fee</Col>
                                        <Col className="checkout-text">£{order.processingPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col><strong className="checkout-text">Total</strong></Col>
                                        <Col><h3 className="checkout-text">£ {order.totalPrice}</h3></Col>
                                    </Row>
                                </ListGroupItem>

                            </ListGroup>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </>
}

export default RetailerOrderReviewScreen