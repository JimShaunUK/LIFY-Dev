import React, { useEffect } from 'react'
import { Nav, ProgressBar } from 'react-bootstrap'

import { Link } from 'react-router-dom'

const RegisterProgressBar = ({ val }) => {



    useEffect(() => {

    })

    return (
        <>
            <ProgressBar className='checkout-bar my-3' animated variant='primary' now={val} />
            <Nav className='justify-content-center'>



                <Nav.Item>

                    <Link to='/register' className="shop-link">click to go back</Link>

                </Nav.Item>

            </Nav>

        </>
    )
}

export default RegisterProgressBar
