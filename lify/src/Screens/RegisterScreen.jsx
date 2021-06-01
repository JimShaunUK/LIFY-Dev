import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register, logout } from '../Actions/userActions'
import FormContainer from '../Components/FormContainer'




const RegisterScreen = ({ location, history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [address, setAddress] = useState('')

    const [street, setStreet] = useState('')
    const [town, setTown] = useState('')
    const [postcode, setPostcode] = useState('')

    const [phone, setPhone] = useState('')

    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, lifyUser } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'



    useEffect(() => {
        if (lifyUser) {
            history.push(redirect)
        }
    }, [history, lifyUser, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            setAddress(street + ', ' + town + ', ' + postcode)
            dispatch(register(name, email, password, address, phone))
        }
    }

    const clearuserData = () => {
        localStorage.removeItem('lifyUser')
        dispatch(logout())
        history.push('/login')
    }

    return (
        <FormContainer>
            <h1 className='py-3'>Sign Up!</h1>
            {error && <h3 className="message-alert">{error}</h3>}
            {message && <h3 className="message-alert">{message}</h3>}
            {loading && <h3>Registering...</h3>}
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

                <Form.Group controlId='phone'>
                    <Form.Label>Email</Form.Label>
                    <FormControl
                        type='phone'
                        placeholder='Enter phone number...'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    ></FormControl>
                </Form.Group>

                <Form.Group controlId='street'>
                    <Form.Label>Street Address</Form.Label>
                    <FormControl
                        type='street'
                        placeholder='Enter street address...'
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
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

                <Form.Group controlId='postcode'>
                    <Form.Label>Postcode</Form.Label>
                    <FormControl
                        type='postcode'
                        placeholder='Enter postcode...'
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
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
                <Button
                    type='submit'
                    variant='warning'
                    className="btn btn-block rounded"
                >Register</Button>


            </Form>
            <Row className="py-3 ">
                <Col className="align-items-center">
                    <h4 className="text-center">Have an account?</h4>


                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={clearuserData} className="btn btn-block" variant="outline-warning rounded">Sign In</Button>
                    {//<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In!</Link>
                    }
                </Col>
            </Row>


        </FormContainer>
    )
}

export default RegisterScreen
