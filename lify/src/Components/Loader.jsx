import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <Spinner className="py-5" animation='grow' role='status' style={{ color: 'black', width: '200px', height: '200px', margin: 'auto', display: 'block' }}>

        </Spinner>
    )
}

export default Loader