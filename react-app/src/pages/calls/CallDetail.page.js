import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ENDPOINTS from "../../api/endpoints";
import {getRequest} from "../../api";
import {usePromiseTracker, trackPromise} from "react-promise-tracker";
import {Card, CardBody, CardHeader, Col, Container, ListGroup, ListGroupItem, Row} from "reactstrap";
import moment from "moment";
import {Button} from "reactstrap";

import AddNoteModal from "./modals/AddNote.modal";
import LoadingCard from "../../global/components/cards/LoadingCard";
import ErrorCard from "../../global/components/cards/ErrorCard";

export default function CallDetailPage() {

    const params = useParams();

    const [data, setData] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const {promiseInProgress} = usePromiseTracker()

    useEffect(() => {
        fetchAdminDetail()
        // eslint-disable-next-line
    }, []);


    function fetchAdminDetail() {
        async function apiCall() {
            try {
                const URL = ENDPOINTS.calls.getCallDetail.replace(':id', params.id)
                const data = await getRequest(URL)
                setData(data)

            } catch (error) {
                console.error(error);
            }
        }

        trackPromise(apiCall())
    }

    const Item = ({label, value}) => {
        return (
            <Row>
                <Col lg={2}><b>{label}:</b></Col>
                <Col>{value}</Col>
            </Row>
        )
    }

    if (!data && !promiseInProgress) return <ErrorCard/>
    if (promiseInProgress) return <LoadingCard/>
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Card>
                        <CardHeader className="fw-bold">Call Id: {data.id}</CardHeader>
                        <CardBody>
                            <Item label={'From'} value={data.from}/>
                            <Item label={'To'} value={data.to}/>
                            <Item label={'Via'} value={data.via}/>
                            <Item label={'Call type'} value={data.call_type}/>
                            <Item label={'Archived'} value={String(data.is_archived)}/>
                            <Item label={'Duration'} value={data.duration}/>
                            <Item label={'Direction'} value={data.direction}/>
                            <Item label={'Date/Time'} value={moment(data.createdAt).format('DD-MM-YY/HH:mm')}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                    <Card>
                        <CardHeader className="fw-bold">
                            <Row>
                                <Col>Notes</Col>
                                <Col className="d-flex justify-content-end"><Button color="primary" size="sm" onClick={()=>setModalVisible(true)}>Add note</Button></Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <ListGroup>
                                {data.notes.map(note => <ListGroupItem>{note.content}</ListGroupItem>)}
                            </ListGroup>
                        </CardBody>

                    </Card>
                </Col>
            </Row>

            <AddNoteModal itemId={data.id} visible={modalVisible} setData={setData} toggleModal={()=>setModalVisible(!modalVisible)}/>
        </Container>
    );
}
