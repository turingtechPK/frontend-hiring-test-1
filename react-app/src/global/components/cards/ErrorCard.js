import React from 'react';
import {Card, Row, Col} from 'reactstrap';

export default function ErrorCard() {
    return (
        <Card>
            <Row>
                <Col className="d-flex justify-content-center align-items-center p-5 m-5">
                    <h5>Something went wrong</h5>
                </Col>
            </Row>
        </Card>
    );
}
