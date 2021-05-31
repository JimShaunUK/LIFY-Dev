import React from 'react'

import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap';

import Search from './Search.jsx'
import { Route } from 'react-router-dom'




const Header = ({ history }) => {



    return (
        <header>
            <Navbar className="nav-fill w-100" bg="light" expand="x">
                <Container>
                    <Navbar.Toggle />
                    <LinkContainer to="/cart">
                        <Nav.Link> <span>
                            <img className="nav-img" src={`images/search.png`} alt="basket"></img>
                        </span></Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/">
                        <Navbar.Brand ><h1>lify</h1></Navbar.Brand>
                    </LinkContainer>
                    <LinkContainer to="/profile">
                        <Nav.Link> <span>
                            <img className="nav-img" src={`images/profile.png`} alt="basket"></img>
                        </span></Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/cart">
                        <Nav.Link> <span>
                            <img className="nav-img" src={`images/basket.png`} alt="basket"></img>
                        </span></Nav.Link>
                    </LinkContainer>
                </Container>
                <Navbar.Collapse className="noborder" id="basic-navbar-nav">
                    <Navbar>
                        <LinkContainer to="/store">
                            <Nav.Link>Shop</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/artists">
                            <Nav.Link>Artists</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/about">
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                    </Navbar>
                </Navbar.Collapse>

                <Navbar.Collapse id="nav-bar-search" className="mr-auto">
                    <Container>


                        <Route render={({ history }) => <Search history={history}></Search>} />



                    </Container>

                </Navbar.Collapse>

            </Navbar>
        </header >
    )
}

export default Header