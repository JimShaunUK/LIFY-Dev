import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Town = ({ product }) => {
    return (
        <Card key={product._id} className="my-3 p-3 rounded product-slide">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    {product.Text}
                </Card.Text>

            </Card.Body>
        </Card>
    )
}

export default Town