import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register, logout } from '../Actions/userActions'
import FormContainer from '../Components/FormContainer'
import RegisterProgressBar from '../Components/RegisterProgressBar'
import Message from '../Components/Message'
import Loader from '../Components/Loader'


const RegisterScreen = ({ location, history }) => {


    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [name, setName] = useState(shippingAddress.name)
    const [email, setEmail] = useState(shippingAddress.email)


    const [streetAddress, setStreetAddress] = useState(shippingAddress.streetAddress)
    const [town, setTown] = useState(shippingAddress.town)
    const [county, setCounty] = useState(shippingAddress.county)
    const [postcode, setPostcode] = useState(shippingAddress.postcode)


    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [address, setAddress] = useState('')





    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'



    useEffect(() => {
        if (userInfo) {
            history.push('/profile')
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            setAddress(streetAddress + ', ' + town + ', ' + county + ', ' + postcode)
            alert(address)
            alert(phone)
            dispatch(register(name, email, password, address, phone))
        }
    }

    const clearuserData = () => {
        localStorage.removeItem('userInfo')
        dispatch(logout())
        history.push('/login')
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
        <FormContainer>
            <h2 className="shop-header-large py-3 text-center">almost there!</h2>
            <RegisterProgressBar val={80} />

            <h4 className="shop-header py-2 text-center">check details and provide a password</h4>



            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <FormControl
                        type='email'
                        placeholder='Enter email...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></FormControl>
                </Form.Group>

                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <FormControl
                        type='address'
                        placeholder='Enter address...'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></FormControl>
                </Form.Group>


                <Form.Group controlId='phone'>
                    <Form.Label>Phone</Form.Label>
                    <FormControl
                        type='phone'
                        placeholder='Enter phone number...'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    ></FormControl>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <FormControl
                        type='password'
                        placeholder='Enter password...'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></FormControl>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <FormControl
                        type='password'
                        placeholder='Confirm password...'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></FormControl>
                </Form.Group>
                <Form.Group className="py-2">
                    {error && <Message className="py-2" variant='danger'>{error}</Message>}
                    {message && <Message className="py-2" variant='danger'>{message}</Message>}
                    {loading && <Loader />}
                </Form.Group>
                <Button
                    type='submit'
                    className="w-100"
                    style={btnStyle}
                >sign up and sign in</Button>


            </Form>

            <Row>

                <Col>
                    <div onClick={clearuserData} className="text-center shop-link-lg py-4">or login here!</div>


                </Col>
            </Row>


        </FormContainer>
    )
}

export default RegisterScreen
