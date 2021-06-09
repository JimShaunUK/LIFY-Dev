import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Table, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../Actions/userActions'

import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { courierAcceptOrder, listCourierOrders } from '../Actions/courierActions'





const AvailableDeliveryScreen = ({ location, history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const courierList = useSelector(state => state.courierList)
    const { loading: loadingC, error: errorC, orders } = courierList

    const courierAccept = useSelector(state => state.courierAccept)
    const { success, order: acceptedOrder } = courierAccept


    useEffect(() => {

        if (!userInfo || userInfo.length === 0) {

            history.push('/register')
        }


        if (error) {
            console.log(error)
            //dispatch(logout())
            //history.push('/login')
        }

        if (!user || !user.name) {
            dispatch({ type: 'USER_UPDATE_PROFILE_RESET' })
            dispatch(getUserDetails('profile'))
            dispatch(listCourierOrders())
            //dispatch(listMyOrders())
            //dispatch(listRetailerOrders())
            //dispatch(listRetailerOwnerDetails(user._id))
            //dispatch(listDashboardData())
        } else {
            setName(user.name)
            setEmail(user.email)
            setAddress(user.address)
            setPhone(user.phone)
        }

        if (success) {
            history.push(`/deliver/${acceptedOrder._id}`)
        } else {
            dispatch(listCourierOrders())
        }


    }, [dispatch, history, userInfo, success, user, error])



    const selectHandler = (order) => {

        if (window.confirm('Are you sure? Once selected you must fulfil the order')) {
            dispatch(courierAcceptOrder(order))
        }
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

    const green = {
        fontWeight: 'bold',
        color: 'green'
    }

    const red = {
        color: 'red',
        fontWeight: 'bold'
    }

    return <>
        <img src={'/images/courier.jpg'} alt="courier banner" className='w-100' />
        <Container >
            <Row>
                <Col className="justify-content-center checkout-text py-2" xs={12}>
                    <h2 className="shop-header-large py-3 text-center">all available orders for picking</h2>
                    <br></br><br></br>
                    <h2 className="shop-header-large">your details</h2>
                    <strong className="shop-text">Phone:  </strong>{user.phone}<br></br>
                    <strong className="shop-text"> Email:  </strong><a href={`mailto:${user.email}`}>{user.email}</a><br></br>
                    <strong className="shop-text">Address:  </strong>{user.address}

                    <br></br><br></br>
                </Col>
            </Row>
        </Container>
        <Container >
            <Row>
                <Col className="justify-content-center" xs={12}>

                    <br></br>
                    {loadingC ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (

                        <Table striped borded hover responsive className="table-sm">
                            <thead>
                                <tr>
                                    <th>Order Ref</th>
                                    <th>Date</th>
                                    <th>Destination</th>
                                    <th>Postcode</th>
                                    <th>Item Count</th>
                                    <th>stops</th>
                                    <th>earnings</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {loadingC ? (<Loader />) : (
                                <>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order._id}>
                                                <td>{(order._id).slice(-6)}</td>
                                                <td>{order.createdAt.substring(0, 10)}</td>
                                                <td>{order.shippingAddress}</td>
                                                <td>{order.postcode}</td>
                                                <td>{order.orderItems.length}</td>
                                                <td>{order.storeOrders.length}</td>
                                                <td>£{order.deliveryPrice}</td>
                                                <td>
                                                    {order.isAssignedCourier ? (<p>Order Assigned</p>) : (
                                                        <Button onClick={() => selectHandler(order)} style={btnStyle}>

                                                            Accept

                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}



                                    </tbody>
                                </>
                            )}
                        </Table>

                    )}
                    {orders ? (orders.length === 0 && <Message className="w-100" variant="info">no orders for pick up!</Message>) : (<Loader />)}
                </Col>
            </Row>

            <Row>
                <h2 className="shop-header-large py-3 text-center">need to speak to our service team?</h2>
                <Col className="text-center my-3" xs={6}> <div style={btnStyle} className="btn">contact customer</div> </Col>
                <Col className="text-center my-3" xs={6}> <div style={btnStyle} className="btn">cannot deliver items</div> </Col>
                <Col className="text-center my-3" xs={6}> <div style={btnStyle} className="btn">item broken or damaged</div> </Col>
                <Col className="text-center my-3" xs={6}> <div style={btnStyle} className="btn">or something else</div> </Col>
            </Row>

        </Container>
    </>
}
export default AvailableDeliveryScreen