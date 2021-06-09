import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Table, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile, logout } from '../Actions/userActions'
import { listMyOrders, listRetailerOrders } from '../Actions/orderActions'
import { listRetailerOwnerDetails, listDashboardData } from '../Actions/retailerActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { Link } from 'react-router-dom'





const ProfileScreen = ({ location, history }) => {

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

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const retailerOrderList = useSelector(state => state.retailerOrderList)
    const { retailOrders, loading: loadingROrders, error: errorROrders } = retailerOrderList

    const retailerDetailsOwner = useSelector(state => state.retailerDetailsOwner)
    const { retailerDetail, loading: loadingRDetails, error: errorRDetails } = retailerDetailsOwner

    const retailerDashboard = useSelector(state => state.retailerDashboard)
    const { dashboard, loading: loadingDash, error: errorDash } = retailerDashboard


    useEffect(() => {

        if (!userInfo || userInfo.length === 0) {

            history.push('/register')
        }


        if (error) {
            console.log(error)
            //dispatch(logout())
            //history.push('/login')
        }

        if (!user || !user.name || success) {
            dispatch({ type: 'USER_UPDATE_PROFILE_RESET' })

            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
            dispatch(listRetailerOrders())
            dispatch(listRetailerOwnerDetails(user._id))
            dispatch(listDashboardData())
        } else {
            setName(user.name)
            setEmail(user.email)
            setAddress(user.address)
            setPhone(user.phone)
        }


    }, [dispatch, history, userInfo, user, success, error])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password, address, phone }))

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
        {loadingRDetails ? (<Loader />) : (
            <>
                <img className="w-100" src={retailerDetail.image} alt="account banner"></img>

                <Container >
                    <Row>
                        <Col className="justify-content-center checkout-text py-2" xs={12}>
                            <h2 className="shop-header-large py-3 text-center">all customer orders for {retailerDetail.name}</h2>
                            <br></br><br></br>
                            <strong className="shop-text">Phone:  </strong>{retailerDetail.phone}<br></br>
                            <strong className="shop-text"> Email:  </strong><a href={`mailto:${retailerDetail.email}`}>{retailerDetail.email}</a><br></br>
                            <strong className="shop-text">Address:  </strong>{retailerDetail.address}

                            <br></br><br></br>
                        </Col>
                    </Row>
                </Container>
            </>
        )}
        {errorRDetails && <Message variant="danger">{errorRDetails}</Message>}


        {dashboard && (
            <Container>
                <Row className="justify-content-center checkout-text py-2">
                    <h2 className="shop-header-large py-3 text-center">by being part of lify you have</h2>
                    <Col xs={4}>
                        <h2 className="shop-header-large py-3 text-center">total sales: <span style={green}>£{dashboard.total}</span></h2>
                    </Col>
                    <Col xs={4}>
                        <h2 className="shop-header-large py-3 text-center">total new orders: <span style={green}>{dashboard.orderCount}</span></h2>
                    </Col>
                </Row>
            </Container>

        )}






        <Container >
            <Row>
                <Col className="justify-content-center" xs={12}>

                    <br></br>
                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (

                        <Table striped borded hover responsive className="table-sm">
                            <thead>
                                <tr>
                                    <th>Order Ref</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>type</th>
                                    <th>updates</th>

                                    <th></th>
                                </tr>
                            </thead>
                            {loadingROrders ? (<Loader />) : (
                                <>
                                    <tbody>
                                        {retailOrders.map((order) => (
                                            <tr key={order._id}>
                                                <td>{(order._id).slice(-6)}</td>
                                                <td>{order.createdAt.substring(0, 10)}</td>
                                                <td><b>£{order.totalPrice}</b></td>
                                                <td>{order.isCollection ? <p>
                                                    collection
                                        </p> : <p>
                                                    delivery
                                        </p>}</td>
                                                <td>{order.isReady ? <p>
                                                    No
                                        </p> : <p style={red}>
                                                    Action required
                                        </p>}</td>
                                                <td>
                                                    <Link to={`/retailers/orders/${order._id}`}>
                                                        <Button style={btnStyle}>

                                                            Inspect

                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}



                                    </tbody>
                                </>
                            )}
                        </Table>

                    )}
                    {retailOrders ? (retailOrders.length === 0 && <Message className="w-100" variant="info">no orders yet!</Message>) : (<Loader />)}
                </Col>
            </Row>

            <Row>
                <h2 className="shop-header-large py-3 text-center">need to speak to our service team?</h2>
                <Col className="text-center my-3" xs={6}> <div style={btnStyle} className="btn">problem with an order</div> </Col>
                <Col className="text-center my-3" xs={6}> <div style={btnStyle} className="btn">customer payment suspicious?</div> </Col>
                <Col className="text-center my-3" xs={6}> <div style={btnStyle} className="btn">customer non-responsive </div> </Col>
                <Col className="text-center my-3" xs={6}> <div style={btnStyle} className="btn">or something else</div> </Col>
            </Row>

        </Container>
    </>
}

export default ProfileScreen