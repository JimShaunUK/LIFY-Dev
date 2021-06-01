import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Search from './Search.jsx'
import { Route } from 'react-router-dom'
import { logout } from '../Actions/userActions'



const Header = ({ history }) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const logoutHandler = () => {
        dispatch(logout())

    }

    useEffect(() => {
        if (!userInfo) {

            dispatch(logout())
        }
    }, [history, dispatch, userInfo])

    const navFix = {
        zIndex: 1000
    }

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
                <Navbar.Collapse style={navFix} className="nav-bg">
                    <Link to="">
                        <div className="nav-block py-1 my-1 mx-1 nav-text">home</div>
                    </Link>
                    <Link to="">
                        <div className="nav-block py-1 my-1 mx-1 nav-text">about us</div>
                    </Link>
                    <Link to="">
                        <div className="nav-block py-1 my-1 mx-1 nav-text">products</div>
                    </Link>
                    <Link to="">
                        <div className="nav-block py-1  my-1 mx-1 nav-text">shops</div>
                    </Link>
                    <Link to="">
                        <div className="nav-block py-1  my-1 mx-1 nav-text">account</div>
                    </Link>


                    <Link to="">
                        <div className="nav-block-retailer py-1  my-1 mx-1 nav-text">retailer dashboard</div>
                    </Link>
                    <Link to="">
                        <div className="nav-block-retailer py-1  my-1 mx-1 nav-text">manage store</div>
                    </Link>
                    <Link to="">
                        <div className="nav-block-retailer py-1  my-1 mx-1 nav-text">manage orders</div>
                    </Link>

                    <Link to="">
                        <div className="nav-block-admin py-1  my-1 mx-1 nav-text">admin:manage towns/retailers</div>
                    </Link>
                    <Link to="">
                        <div className="nav-block-admin py-1 my-1 mx-1 nav-text">admin: manage user accounts</div>
                    </Link>
                    <Link to="">
                        <div className="nav-block-admin py-1 my-1 mx-1 nav-text">admin: manager orders</div>
                    </Link>
                    <Link>
                        <div onClick={logoutHandler} className="nav-block-retailer py-1 my-1 mx-1 nav-text">log out</div>
                    </Link>

                </Navbar.Collapse>

                <Navbar.Collapse id="nav-bar-search" className="mr-auto">
                    <Container >

                        <div className="my-2">
                            <Route render={({ history }) => <Search history={history}></Search>} />

                        </div>

                    </Container>

                </Navbar.Collapse>

            </Navbar>
        </header >
    )
}

export default Header