import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../Components/Message'

const Search = ({ history }) => {

    const [keyword, setKeyword] = useState('')

    const [message, setMessage] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        }
        history.push('/towns')

    }

    return (
        <>
            <Form onSubmit={submitHandler} className="form-search">

                {message && <Message>{message}</Message>}
                <Row>
                    <Col xs={6} sm={6} md={8}>
                        <Form.Control
                            name='q'
                            onChange={(e) => setKeyword(e.target.value)}
                            className="mb-2"
                            id="inlineFormInput"
                            placeholder="Search Products"
                        />
                    </Col>


                    <Col xs={6} sm={6} md={4}>
                        <Button type="submit" variant='outline-warning rounded' className="mb-2 btn btn-block">
                            Search
                    </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Search
