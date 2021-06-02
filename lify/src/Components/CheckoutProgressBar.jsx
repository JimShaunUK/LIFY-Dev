import React, { useEffect } from 'react'
import { Nav, ProgressBar } from 'react-bootstrap'

import { Link } from 'react-router-dom'

const CheckoutProgressBar = ({ val }) => {



    useEffect(() => {

    })

    return (
        <>
            <ProgressBar className='checkout-bar my-3' animated variant='primary' now={val} />
            <Nav className='justify-content-center'>



                <Nav.Item>

                    <Link to='/cart' className="shop-link w-100 mx-3">basket</Link>


                </Nav.Item>
                <Nav.Item>
                    <Link to='/review/order' className="shop-link w-100 mx-3">review/shipping</Link>
                </Nav.Item>

                <Nav.Item>
                    <Link className="shop-link w-100 mx-3" disabled>pay</Link>
                </Nav.Item>




            </Nav>

        </>
    )
}

export default CheckoutProgressBar
