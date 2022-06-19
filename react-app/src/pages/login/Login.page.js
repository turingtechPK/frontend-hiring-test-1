import React, {useState} from "react";
import {Container, Row, Col, Form, FormGroup, Label, Input, Button} from "reactstrap";
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import {postRequest} from "../../api";
import ENDPOINTS from "../../api/endpoints";
import AuthenticationService from '../../services/Authentication.service'
import {useDispatch} from "react-redux";
import {setToken} from "../../redux/slicer";


export default function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const {promiseInProgress} = usePromiseTracker();

    function login() {
        async function apiCall() {
            try {
                const body = {username, password};
                const {access_token} = await postRequest(ENDPOINTS.login, body);
                if (access_token) {
                    AuthenticationService.login(access_token);
                    setTimeout(() => {
                        dispatch(setToken(access_token))
                    }, 1000)
                }
            } catch (e) {
                console.error(e)
            }
        }

        trackPromise(apiCall())
    }

    return (
        <Container fluid className="h-100">
            <Row className="justify-content-center align-items-center h-100">
                <Col lg={4}>
                    <Form>
                        <FormGroup>
                            <Label for="username">
                                Username
                            </Label>
                            <Input onChange={e => setUsername(e.target.value)} valid={username}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            <Input type="password" onChange={e => setPassword(e.target.value)} valid={password}/>
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" block color="primary" onClick={login} disabled={promiseInProgress}>
                                Login
                            </Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
