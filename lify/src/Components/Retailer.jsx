import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Retailer = ({ retailer }) => {
    return (
        <Card key={retailer._id} className="my-3 p-3 rounded retailer-slide">
            <Link to={`/retailer/${retailer._id}`}>
                <Card.Img src={retailer.image} />
            </Link>
            <Card.Body>

                <Card.Title>
                    <p class="shop-header">{retailer.name}</p>
                </Card.Title>

                <Card.Text>
                    <p class="shop-text">£{retailer.address}</p>
                </Card.Text>
                <Link to={`/retailer/${retailer._id}`}>
                    <Card.Text>
                        <p class="shop-link">{retailer.category}</p>
                    </Card.Text>
                </Link>
            </Card.Body>
        </Card >
    )
}



export default Retailer