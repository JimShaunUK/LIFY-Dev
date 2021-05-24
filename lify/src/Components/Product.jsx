import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Product = ({ product }) => {
    return (
        <Card key={product._id} className="my-3 p-3 rounded product-slide">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} />
            </Link>
            <Card.Body>

                <Card.Title>
                    <p class="shop-header">{product.name}</p>
                </Card.Title>

                <Card.Text>
                    <p class="shop-text">£{product.price}</p>
                </Card.Text>
                <Link to={`/product/${product._id}`}>
                    <Card.Text>
                        <p class="shop-link">{product.town}</p>
                    </Card.Text>
                </Link>
            </Card.Body>
        </Card >
    )
}



export default Product