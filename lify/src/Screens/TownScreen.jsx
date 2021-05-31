import React, { useEffect } from 'react'
import { Row, Col, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listTowns } from '../Actions/townActions'
import Loader from '../Components/Loader'
import Town from '../Components/Town'


const HomeScreens = () => {


    const dispatch = useDispatch()

    const townList = useSelector(state => state.townList)
    const { loading, towns } = townList

    useEffect(() => {

        dispatch(listTowns())

    }, [dispatch])



    return (
        <>

            {loading && <Loader />}
            <div>
                <h1 className="py-3 text-center">our cooperative towns</h1>
                <Row>

                    {towns.map(town => (
                        <Col sm={12} md={12} lg={6}>
                            <Town town={town} />
                        </Col>
                    ))}

                </Row>
            </div>
        </>
    )
}

export default HomeScreens
