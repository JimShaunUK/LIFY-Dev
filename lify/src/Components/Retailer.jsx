import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Retailer = ({ retailer }) => {

    const tableStyle = {
        border: "none",
        boxShadow: "none",
        borderRadius: "0",
        rounded: false
    };

    return (
        <Card style={tableStyle} key={retailer._id} className="product-slide rounded-0 m-0 p-0">
            <Link to={`/town/retailer/products/${retailer._id}`}>
                <Card.Img src={retailer.image} alt={retailer.name} />
            </Link>
            <Card.Body>

                <Card.Title>
                    <p class="shop-header">{retailer.name}</p>
                </Card.Title>

                <Card.Text>
                    <p class="shop-text">{retailer.address}</p>
                </Card.Text>


                <Card.Text>
                    <p class="shop-text">Category: {retailer.category}</p>
                </Card.Text>

            </Card.Body>
        </Card >
    )
}



export default Retailer