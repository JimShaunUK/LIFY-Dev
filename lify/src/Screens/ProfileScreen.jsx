import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, FormControl, Table, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile, logout } from '../Actions/userActions'
import { listMyOrders } from '../Actions/orderActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'





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

    const orderListMy = useSelector(state => state.orderListMy)
    const { orders, loading: loadingOrders, error: errorOrders } = orderListMy



    useEffect(() => {
        if (error) {
            console.log(error)
            //dispatch(logout())
            //history.push('/login')
        }

        if (!user || !user.name || success) {
            dispatch({ type: 'USER_UPDATE_PROFILE_RESET' })
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
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

    return <>

        <img className="w-100" src={"images/account.jpg"} alt="account banner"></img>


        <Container >
            <Row>
                <Col className="justify-content-center" xs={12}>
                    <h2 className="shop-header-large py-3 text-center">your recent orders</h2>
                    <br></br>
                    {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (

                        <Table striped borded hover responsive className="table-sm">
                            <thead>
                                <tr>
                                    <th>Order Ref</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Dispatched</th>
                                    <th>Review Order</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{(order._id).slice(-6)}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td><b>£{order.totalPrice}</b></td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : <span class="material-icons" style={{ color: "red" }}>
                                            warning
                                        </span>}</td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <span class="material-icons" style={{ color: "red" }}>
                                            warning
                                        </span>}</td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant='primary' className="rounded">Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}



                            </tbody>

                        </Table>

                    )}
                    {orders ? (orders.length === 0 && <Message className="w-100" variant="info">no orders yet!</Message>) : (<Loader />)}
                </Col>
            </Row>

            <Row>
                <h2 className="shop-header-large py-3 text-center">need to speak to someone?</h2>
                <Col className="text-center my-3" xs={6}> <div style={btnStyle} className="btn">problem with an order</div> </Col>
                <Col className="text-center my-3" xs={6}> <div style={btnStyle} className="btn">wheres my stuff?</div> </Col>
                <Col className="text-center my-3" xs={6}> <div style={btnStyle} className="btn">can i deliver too? </div> </Col>
                <Col className="text-center my-3" xs={6}> <div style={btnStyle} className="btn">or something else</div> </Col>
            </Row>
            <Row>

                <Col md={12}>
                    <h2 className="shop-header-large py-3 text-center">details changed?</h2>
                    <h4 className="shop-header  text-center">view and update details here</h4>
                    {error && <Message variant='danger'>{errorOrders}</Message>}
                    {message && <Message variant='danger'>{message}</Message>}
                    {success && <Message variant='success'>Profile Updated!</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Update Account Name</Form.Label>
                            <FormControl
                                type='name'
                                placeholder='Enter name...'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></FormControl>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Update Account Email</Form.Label>
                            <FormControl
                                type='email'
                                placeholder='Enter email...'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></FormControl>
                        </Form.Group>

                        <Form.Group controlId='phone'>
                            <Form.Label>Update Account Phone</Form.Label>
                            <FormControl
                                type='phone'
                                placeholder='Enter Phone Number...'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            ></FormControl>
                        </Form.Group>

                        <Form.Group controlId='address'>
                            <Form.Label>Update Account Address</Form.Label>
                            <FormControl
                                type='address'
                                placeholder='Enter email...'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></FormControl>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Update Password</Form.Label>
                            <FormControl
                                type='password'
                                placeholder='Enter password...'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></FormControl>
                        </Form.Group>
                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Confirm Updated Password</Form.Label>
                            <FormControl
                                type='password'
                                placeholder='Confirm password...'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></FormControl>
                        </Form.Group>
                        <Button
                            style={btnStyle}
                            type='submit'
                            className="w-100 btn block my-2"
                            block
                        >Save!</Button>


                    </Form>

                </Col>


            </Row>
        </Container>
    </>
}

export default ProfileScreen