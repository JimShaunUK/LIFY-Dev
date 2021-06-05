import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { logout } from '../Actions/userActions'



const Header = ({ history }) => {




    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    const logoutHandler = () => {
        localStorage.removeItem('userInfo')
        dispatch(logout())

    }

    useEffect(() => {



    }, [history])


    const navFix = {
        zIndex: '1000'
    }





    return (
        <header>

            <Navbar className="nav-fill w-100" bg="light" expand="x">
                <Container>
                    <Navbar.Toggle id="test" aria-controls="basic-navbar-nav" />
                    <LinkContainer to="/search">
                        <Nav.Link> <span>
                            <img className="nav-img" src={`/images/search.png`} alt="search"></img>
                        </span></Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/">
                        <Navbar.Brand ><h1>lify</h1></Navbar.Brand>
                    </LinkContainer>
                    <LinkContainer to="/profile">
                        <Nav.Link> <span>
                            <img className="nav-img" src={`/images/profile.png`} alt="account"></img>
                        </span></Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/cart">
                        <Nav.Link> <span>
                            <img className="nav-img" src={`/images/basket.png`} alt="basket"></img>
                        </span></Nav.Link>
                    </LinkContainer>
                </Container>
                <Navbar.Collapse style={navFix} id="collapseNav" className="nav-bg">

                    <>
                        <Link to="/">
                            <div className="nav-block py-1 my-1 mx-1 nav-text">home</div>
                        </Link>
                        <Link to="/about">
                            <div className="nav-block py-1 my-1 mx-1 nav-text">about us</div>
                        </Link>
                        <Link to="/towns">
                            <div className="nav-block py-1 my-1 mx-1 nav-text">towns and products</div>
                        </Link>


                        {userInfo ? (
                            <>
                                <Link to="/profile">
                                    <div className="nav-block py-1  my-1 mx-1 nav-text">account</div>
                                </Link>
                                <Link to='/login'>
                                    <div onClick={logoutHandler} className="nav-block-retailer py-1 my-1 mx-1 nav-text">log out</div>
                                </Link>

                                {userInfo && userInfo.isRetailer && (
                                    <>
                                        <Link to="/">
                                            <div className="nav-block-retailer py-1  my-1 mx-1 nav-text">retailer dashboard</div>
                                        </Link>
                                        <Link to="/">
                                            <div className="nav-block-retailer py-1  my-1 mx-1 nav-text">manage store</div>
                                        </Link>
                                        <Link to="/retailers/orders">
                                            <div className="nav-block-retailer py-1  my-1 mx-1 nav-text">manage orders</div>
                                        </Link>

                                    </>
                                )}
                                {userInfo && userInfo.isAdmin && (
                                    <>
                                        <Link to="">
                                            <div className="nav-block-admin py-1  my-1 mx-1 nav-text">admin:manage towns/retailers</div>
                                        </Link>
                                        <Link to="">
                                            <div className="nav-block-admin py-1 my-1 mx-1 nav-text">admin: manage user accounts</div>
                                        </Link>
                                        <Link to="">
                                            <div className="nav-block-admin py-1 my-1 mx-1 nav-text">admin: manager orders</div>
                                        </Link>

                                    </>
                                )}
                            </>
                        ) : (
                            <Link to="/login">
                                <div className="nav-block py-1  my-1 mx-1 nav-text">login/register</div>
                            </Link>
                        )}

                    </>

                </Navbar.Collapse>


            </Navbar>
        </header >
    )
}

export default Header