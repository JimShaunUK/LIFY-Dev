import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap'


const HomeScreen = (location, history) => {




    return (
        <div>

            <div className="cont">
                <div className="bg"></div>
                <div className="home-text">
                    <h1>a digital shopping cooperative</h1>
                </div>
                <div className="home-btn">
                    <Link className='btn' to='/towns'><p className="home-btn-txt">shop your town</p></Link>
                </div>
            </div>

            <div className="grey-section">
                <Container >
                    <h2 className="text-center py-4 white">shop all</h2>


                    <div className="scrolling-wrapper-flexbox py-4">

                        <Card bg="dark" border="none" variant="dark" className="item mx-3" style={{ width: '18rem' }}>
                            <Card.Img src={"images/antiques.jpeg"} />
                            <Card.Body>
                                <Card.Title><h4 className="white text-center">antiques and restoration</h4></Card.Title>
                                <Card.Text>
                                    <Link to='/towns'><p className="white-text underline">shop your town</p></Link>

                                </Card.Text>

                            </Card.Body>
                        </Card>
                        <Card bg="dark" border="none" variant="dark" className="item mx-3" style={{ width: '18rem' }}>
                            <Card.Img src={"images/wine.jpeg"} />
                            <Card.Body>
                                <Card.Title><h4 className="white text-center">beer and wine</h4></Card.Title>
                                <Card.Text>
                                    <Link to='/towns'><p className="white-text underline">shop your town</p></Link>

                                </Card.Text>

                            </Card.Body>
                        </Card>

                        <Card bg="dark" border="none" variant="dark" className="item mx-3" style={{ width: '18rem' }}>
                            <Card.Img src={"images/craft.jpeg"} />
                            <Card.Body>
                                <Card.Title><h4 className="white text-center">craft and hobbies</h4></Card.Title>
                                <Card.Text>
                                    <Link to='/towns'><p className="white-text underline">shop your town</p></Link>

                                </Card.Text>

                            </Card.Body>
                        </Card>

                        <Card bg="dark" border="none" variant="dark" className="item mx-3" style={{ width: '18rem' }}>
                            <Card.Img src={"images/coffee.jpeg"} />
                            <Card.Body>
                                <Card.Title><h4 className="white text-center">coffee and tea</h4></Card.Title>
                                <Card.Text>
                                    <Link to='/towns'><p className="white-text underline">shop your town</p></Link>

                                </Card.Text>

                            </Card.Body>
                        </Card>

                        <Card bg="dark" border="none" variant="dark" className="item mx-3" style={{ width: '18rem' }}>
                            <Card.Img src={"images/clothes.jpeg"} />
                            <Card.Body>
                                <Card.Title><h4 className="white text-center">vintage and tailored</h4></Card.Title>
                                <Card.Text>
                                    <Link to='/towns'><p className="white-text underline">shop your town</p></Link>

                                </Card.Text>

                            </Card.Body>
                        </Card>

                    </div>

                </Container>

            </div >
            <div className="dark-grey-section">

                <h2 className='white text-center py-3'>about us</h2>
                <img className='w-100' src={"images/paybanner.jpeg"} alt="paying"></img>
                <Container>
                    <p className="white-text py-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac arcu nibh. Aliquam mollis dui vel libero gravida eleifend. Nullam porta velit et tellus blandit iaculis. Quisque auctor urna eu leo vehicula, ut suscipit massa rutrum. Phasellus mollis congue justo a cursus. Maecenas placerat lacinia ornare.</p>
                </Container>
            </div>
        </div >
    )
}

export default HomeScreen