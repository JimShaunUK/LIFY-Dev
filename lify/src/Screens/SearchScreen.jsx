import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../Components/Message'
import FormContainer from '../Components/FormContainer'

const SearchScreen = ({ history }) => {
    const [keyword, setKeyword] = useState('')
    const [message, setMessage] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword === '') {
            setMessage('Enter a search term to search!')
        }
        else if (keyword.trim()) {
            history.push(`/results/${keyword}`)
        }

    }

    const btnStyle = {
        display: 'block',
        backgroundColor: 'black',
        color: 'white',
        fontFamily: 'arial',
        letterSpacing: '0.2rem',
        borderRadius: "0",
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        display: 'block'
    }

    return (
        <>
            <h2 className="shop-header-large py-3 text-center">looking for something?</h2>
            <h4 className="shop-header  text-center">search for products, shops or locations</h4>

            <FormContainer>
                <Form onSubmit={submitHandler} className="form-search">
                    {message && <Message>{message}</Message>}
                    <Row>

                        <Form.Control
                            name='q'
                            onChange={(e) => setKeyword(e.target.value)}
                            className="my-3"
                            id="inlineFormInput"
                            placeholder="search for something!"
                        />



                        <Col>
                            <Button type="submit" style={btnStyle} className="my-2 w-100">
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </FormContainer>
        </>
    )

}

export default SearchScreen
