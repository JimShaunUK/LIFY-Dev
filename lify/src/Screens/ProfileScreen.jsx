import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, FormControl, Table } from 'react-bootstrap'
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
            dispatch(logout())
            history.push('/login')
        }

        if (!user || !user.name || success) {
            dispatch({ type: 'USER_UPDATE_PROFILE_RESET' })
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
        } else {
            setName(user.name)
            setEmail(user.email)
        }


    }, [dispatch, history, userInfo, user, success, error])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))

        }
    }

    return <>
        <Row>
            <h1 className="py-3 w-100">My Account</h1>
        </Row>
        <Row>
            <Col md={3}>
                <h2 className='py-3'>Edit Details</h2>
                {error && <Message variant='danger'>{errorOrders}</Message>}
                {message && <h3 className="message-alert">{message}</h3>}
                {success && <h3 className="message-alert-success">Profile Updated Successfully!</h3>}
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
                        type='submit'
                        variant='outline-warning rounded'>Update!</Button>


                </Form>

            </Col>
            <Col md={9}>
                <h2 className="py-3">My Order History</h2>
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
            </Col>
        </Row>
    </>
}

export default ProfileScreen