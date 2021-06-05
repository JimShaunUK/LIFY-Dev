import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button, ListGroupItem, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { deliverOrder, getRetailerOrderDetails } from '../Actions/orderActions'
import { getCustomerDetails } from '../Actions/userActions'
import { listRetailerOwnerDetails } from '../Actions/retailerActions'


const RetailerOrderReviewScreen = ({ match, history }) => {

    const orderId = match.params.id

    const dispatch = useDispatch()



    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const retailerOrderDetails = useSelector((state) => state.retailerOrderDetails)
    const { order, loading, error } = retailerOrderDetails

    const customerDetails = useSelector((state) => state.customerDetails)
    const { customer, loading: loadingCustomer, error: errorCustomer } = customerDetails

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const retailerDetailsOwner = useSelector(state => state.retailerDetailsOwner)
    const { retailerDetail, loading: loadingRDetails, error: errorRDetails } = retailerDetailsOwner


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
            dispatch({ type: 'ORDER_DELIVER_RESET' })
            dispatch(getRetailerOrderDetails(orderId))
            dispatch(listRetailerOwnerDetails(userInfo._id))
        }

        if (order && order._id && !customer.name) {
            dispatch(getCustomerDetails(order.customer))
        }



    }, [dispatch, customer, orderId, order, successDeliver, history, userInfo])


    const deliverHandler = () => {
        dispatch(deliverOrder(order))
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


    return loading ? (<Loader />)
        : (
            <>
                {retailerDetail &&
                    <img className="w-100" src={retailerDetail.image} alt="account banner" />
                }
                {loadingCustomer ? (<Loader />) : (
                    <Container>

                        <h1 className='shop-header-large py-4 text-center'>Your Order Reference: {order._id.slice(-6)}</h1>

                        <Row>
                            <Col md={8}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item className="checkout-text py-2">
                                        <>
                                            <h3 className='shop-header-large py-3 text-center'>Customer Details</h3>
                                            <strong>Name:</strong>{customer.name}<br></br>
                                            <strong>Email: </strong><a href={`mailto:${customer.email}`}>{customer.email}</a><br></br>
                                            <strong>Address: </strong>
                                            {customer.address}
                                            <br></br><br></br>
                                            {order.isReady ? <Message variant="success">order marked as ready</Message> :
                                                <Message variant='danger'>order confirmed, but its not ready yet!</Message>}
                                        </>

                                    </ListGroup.Item>

                                    {loadingDeliver && <Loader />}
                                    {userInfo && userInfo.isRetailer && order.isPaid && !order.isDispatched && (
                                        <ListGroupItem>
                                            <Button style={btnStyle} type="button" className="btn w-100" onClick={deliverHandler}>Mark as Dispatched</Button>
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

                                        <>
                                            {order.isPaid ? <Message variant="success">payment completed on: {order.createdAt.substring(0, 10)}</Message> :
                                                <>
                                                    <Message variant='danger'>Payment not yet Complete</Message>
                                                </>}
                                        </>
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
                                                <Col className="checkout-text">Items - Your Payment Due</Col>
                                                <Col className="checkout-text">£ {order.itemsPrice}</Col>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <Row>
                                                <Col className="checkout-text">Shipping Price (customer ref only)</Col>
                                                <Col className="checkout-text">£ {order.shippingPrice}</Col>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <Row>
                                                <Col className="checkout-text">lify fees (paid by customer)</Col>
                                                <Col className="checkout-text">£ {order.handling}</Col>
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
                )}
            </>

        )
}

export default RetailerOrderReviewScreen