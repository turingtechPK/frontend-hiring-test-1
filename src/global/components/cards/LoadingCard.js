import React from 'react';
import {Card, Row, Col, Spinner} from 'reactstrap';

export default function LoadingCard() {
    return (
        <Card>
            <Row>
                <Col className="d-flex justify-content-center align-items-center p-5 m-5">
                    <Spinner/>
                </Col>
            </Row>
        </Card>
    );
}
