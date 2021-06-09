import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'

const AboutScreen = () => {


    return (
        <div>
            <img className="w-100" src={"/images/about.jpg"} alt="about banner" />
            <Container>
                <Row>
                    <Col xs={8}>
                        <h1 className='shop-header-large py-2 mt-4'>lify</h1>
                        <h3 className='shop-header py-2'>[<i>liff-ee</i>]</h3>
                        <h3 className='shop-header'><b>noun</b></h3>
                        <h3 className='shop-header'><b>1.</b> local independents for you</h3>
                        <h3 className='shop-header'><b>2.</b> an online shop providing small local shop keepers a shared space to sell their hand made or hand selected items.</h3>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default AboutScreen
