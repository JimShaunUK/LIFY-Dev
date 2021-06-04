import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

const SearchScreen = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/results/${keyword}`)
        }
        else {
            history.push('/store')
        }
    }

    return (
        <>
            <Form onSubmit={submitHandler} className="form-search">
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

export default SearchScreen
