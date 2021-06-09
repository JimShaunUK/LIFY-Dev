import React, { useEffect, useState } from 'react'
import { Row, Col, ListGroup, Image, Button, ListGroupItem, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { getOrderDetails } from '../Actions/orderActions'
import { getDeliveryData, completeDelivery } from '../Actions/courierActions'


const DeliveryScreen = ({ match, history }) => {

    const orderId = match.params.id

    const dispatch = useDispatch()

    const [messages, setMessages] = useState('')

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const deliveryData = useSelector(state => state.deliveryData)
    const { loading: dataLoading, delivery } = deliveryData

    const deliveryComplete = useSelector(state => state.deliveryComplete)
    const { loading: completeLoading, success, info } = deliveryComplete

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
            dispatch(getDeliveryData(orderId))
        }


        if (success) {
            setMessages('hello')
        }


    }, [dispatch, order, orderId, successDeliver, history, userInfo, success])


    const completeHandler = () => {
        //dispatch(deliverOrder(order))

        dispatch(completeDelivery(order))
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


    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
        :
        <>
            <img src={'/images/courier.jpg'} alt="courier banner" className='w-100' />
            <Container >

                <h1 className='shop-header-large py-4 text-center'>Customers Order Ref: {(order._id).slice(-6)}</h1>
                <Row className="justify-content-center">
                    <Col md={10}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item className="checkout-text py-2">
                                <h3 className='shop-header-large py-3 text-center'>customer details</h3>
                                <strong>Deliver to:</strong>{order.user.name}<br></br>
                                <strong>Address: </strong>
                                {order.shippingAddress}, {order.postcode}
                                <br></br><br></br>

                            </ListGroup.Item>

                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroupItem>
                                    <Button type="button" className="btn btn-block btn-primary" >Mark as Dispatched</Button>
                                </ListGroupItem>
                            )}

                            {dataLoading ? (<Loader />) : (
                                <ListGroup.Item className="checkout-text">
                                    <h3 className='shop-header-large py-3 text-center'>items and pick up locations</h3>
                                    {order.orderItems.length === 0 ? <Message>Order is empty!</Message> : (
                                        <ListGroup variant='flush'>

                                            {order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>
                                                        <Col>

                                                            {item.name}

                                                        </Col>
                                                        <Col md={3}>
                                                            QTY:<b>{item.qty}</b>
                                                        </Col>
                                                        <Col md={3}>
                                                            {delivery.stops[index].name}
                                                        </Col>
                                                        <Col md={3}>
                                                            {delivery.stops[index].address}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                                </ListGroup.Item>
                            )}
                            <>
                                {dataLoading ? (<Loader />) : (
                                    <ListGroup.Item>
                                        <iframe
                                            className="w-100"
                                            title="map"
                                            height="500px"
                                            src={delivery.mapData}>
                                        </iframe>
                                    </ListGroup.Item>
                                )}
                            </>
                            <ListGroup.Item className="checkout-text">
                                <h3 className='shop-header-large py-3 text-center '>Mark as Delivered!</h3>
                                {success ? (<Message variant="success">{info.message}</Message>) : (
                                    <>
                                        {!order.isDelivered ? (
                                            <Button className="w-100" onClick={() => completeHandler(order)} style={btnStyle}>

                                                it's in the customer's hands

                                            </Button>
                                        ) : (
                                            <Message variant="success">ordered delivered on: {order.deliveredAt}</Message>
                                        )}
                                    </>
                                )}
                            </ListGroup.Item>


                        </ListGroup>
                    </Col>



                </Row>

            </Container>
        </>
}

export default DeliveryScreen