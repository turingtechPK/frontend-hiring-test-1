import React from 'react';
import {Outlet} from 'react-router-dom';
import {Container} from "reactstrap";

export default function AppLayout() {
    return (
        <Container fluid className="p-5">
            <Outlet/>
        </Container>
    );
}
