import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Town = ({ town }) => {

    const tableStyle = {
        border: "none",
        boxShadow: "none",
        borderRadius: "0",
        rounded: false
    };


    return (
        <Card style={tableStyle} key={town._id} className="product-slide my-0 p-0">
            <Link to={`/town/products/${town._id}`}>
                <Card.Img src={town.image} alt={town.name} />
            </Link>
            <Card.Body>
                <Link to={`/town/products/${town._id}`}>
                    <Card.Title as="div">
                        <strong>{town.name}</strong>
                    </Card.Title>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default Town