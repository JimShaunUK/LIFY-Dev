import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Container, } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../Actions/cartActions'
import CheckoutProgressBar from '../Components/CheckoutProgressBar'
import FormContainer from '../Components/FormContainer'
import Message from '../Components/Message'
import DatePicker from 'react-date-picker'

//stripe
import { Elements } from "@stripe/react-stripe-js"
import CreditCardForm from '../PaymentWidgets/CreditCardForm'
import { loadStripe } from "@stripe/stripe-js"


const PaymentScreen = ({ match, location, history }) => {

    const productId = match.params.id

    //whatever is in the url after the ? will store in qty
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    //console.log(qty)

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const userInfo = useSelector(state => state.userLogin.userInfo)



    const { shippingAddress } = cart


    const [message, setMessage] = useState(null)



    useEffect(() => {


        if (productId) {
            dispatch(addToCart(productId, qty))
        }



        //alert(delivery)

    }, [dispatch, userInfo, productId, qty])



    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }


    const checkOutHandler = () => {

        if (userInfo.length === 0 || !userInfo) {

            history.push('/register')
        }
        else {
            history.push('/checkout')
        }
    }



    const goBack = () => {
        history.goBack()
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

    const cardStyle = {
        border: 'none'
    }

    return (
        <>
            <Container>
                <Row Row className="justify-content-center">
                    <h2 className="shop-header-large py-3 text-center">almost there!</h2>
                    <Col xs={10}>
                        <CheckoutProgressBar val={85} />
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row className="justify-content-center">
                    <h2 className="shop-header-large py-3 text-center">enter payment details</h2>
                    <Col xs={2} className="justify-content-center">
                        <img className="w-100" src={'/images/paymentcard.jpg'} alt='credit card logos' />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={8} className='my-2 text-right'>
                        <h4 className="checkout-text py-3 ">Total Includes all delivery charges and a handling fee of £{3} to handle lify’s operating costs, and to ensure sellers retain 100% of the money you send them</h4>

                    </Col>
                </Row>
                <Row>
                    <Card style={cardStyle} id="paymentWidgetContainerCard">



                        <Card.Body>


                            <Elements
                                stripe={loadStripe("pk_test_51IUavEFV3SCXvY9fubZHWbPtve3bWc9yFTuEM5Cx05OEblstUpwW67DwVEcYVMciTAFImsZeyshfX9MVQvGdftLQ00uES24w7o")}
                            >
                                <CreditCardForm order={cart.order} />
                            </Elements>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>











        </>
    )
}

export default PaymentScreen