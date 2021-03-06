import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Card, Row, Button, Col } from "react-bootstrap";
import CreditCardForm from "./CreditCardForm";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./PaymentComponent.css";
import "./elements.css";
import { useHistory } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

//config of fonts for the stripe prebuilt elements


//component
export default function PaymentComponent(props) {
    //history object for redirects
    let history = useHistory();

    //render
    return (

        //bootstrap card container
        <Card id="paymentWidgetContainerCard">

            {/* header and back button */}
            <Card.Header>
                <Row>
                    <Col md="auto">
                        <Button
                            variant="danger"
                            onClick={() => {
                                history.push("/");
                            }}
                        >
                            Back
                        </Button>
                    </Col>
                </Row>
            </Card.Header>

            {/* body */}
            <Card.Body>

                {/* Elements Wrapper and checkout form component */}
                <Elements
                    stripe={loadStripe(props.keys.stripe)}
                >
                    <CreditCardForm />
                </Elements>
            </Card.Body>
        </Card>
    );
}