import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Actions/userActions'
import { saveShippingAddress } from '../Actions/cartActions'
import FormContainer from '../Components/FormContainer'
import Message from '../Components/Message'


const RegisterScreen = ({ location, history }) => {



    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')


    const [streetAddress, setStreetAddress] = useState('')
    const [town, setTown] = useState('')
    const [county, setCounty] = useState('')
    const [postcode, setPostcode] = useState('')

    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { error, userInfo } = userRegister


    useEffect(() => {
        if (userInfo) {
            history.push('/account')
        }
    }, [history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()

        if (name === '') {
            setMessage('An account owner needs a name!')
        }
        else if (email === '') {
            setMessage('You must provide a unique email!')
        }
        else if (streetAddress === '') {
            setMessage('You must provide a street address!')
        }
        else if (town === '') {
            setMessage('You must provide a town')
        }
        else if (county === '') {
            setMessage('You must provide a county!')
        }
        else if (postcode === '') {
            setMessage('You must provide a valid postcode!')
        }
        else {
            dispatch(saveShippingAddress({ name, email, streetAddress, town, county, postcode }))
            history.push('/register/complete')
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
            <h2 className="shop-header-large py-3 text-center">sign up!</h2>
            <h4 className="shop-header  text-center">create an account to purchase and track orders</h4>

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
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <FormControl
                        type='email'
                        placeholder='Enter email...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

                <Form.Group className='my-2 text-center'>
                    {message && <Message variant='danger'>{message}</Message>}
                </Form.Group>

                <Button
                    type='submit'
                    className="w-100"
                    style={btnStyle}
                >Register</Button>


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
