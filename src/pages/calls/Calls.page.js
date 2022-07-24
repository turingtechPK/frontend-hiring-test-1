import React, { useEffect, useState } from "react";
import { Paginator, Table } from "../../global/components";
import { getRequest, putRequest } from "../../api";
import ENDPOINTS from "../../api/endpoints";
import moment from 'moment';
import { Badge, Button, Col, Row, Spinner } from "reactstrap";
import { useNavigate } from "react-router";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import LoadingOverlay from 'react-loading-overlay';

export default function CallsPage() {

    const [data, setData] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [activePage, setActivePage] = useState(1);

    const [checkedCalls, setCheckedCalls] = useState([]);
    const [allChecked, setAllChecked] = useState(false);

    const { promiseInProgress: fetchPromise } = usePromiseTracker({ area: 'fetch' })

    const navigate = useNavigate();

    // Fetch calls and reset check list every time page changes
    useEffect(() => {
        fetchCalls()
        setAllChecked(false)
        setCheckedCalls([])
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activePage]);


    // Stores the data about what to render in table
    const COLUMNS = [
        {
            checkbox: true
        },
        {
            title: 'From',
            dataKey: 'from'
        },
        {
            title: 'To',
            dataKey: 'to'
        },
        {
            title: 'Call type',
            dataKey: 'call_type',
            render: item => item === 'answered' ? <Badge color="success">Answered</Badge> :
                <Badge color="danger">Missed</Badge>
        },
        {
            title: 'Duration',
            dataKey: 'duration'
        },
        {
            title: 'Date/Time',
            dataKey: 'created_at',
            render: item => moment(item).format('DD-MM-YY/HH:mm')
        },
        {
            title: 'Action',
            dataKey: '',
            render: item => {
                return (
                    <div>
                        {!item.is_archived && <Button color="primary" size="sm" onClick={() => archiveCall(item.id)}
                            style={{ marginRight: 5 }}>Archive</Button>}
                        <Button color="primary" size="sm" onClick={() => navigate(`/calls/detail/${item.id}`)}>Details</Button>
                    </div>
                )
            }
        }
    ]

    function fetchCalls() {
        async function apiCall() {
            try {
                const URL = ENDPOINTS.calls.getCallsList.replace(':offset', (activePage - 1) * 10).replace(':limit', '10');
                const { nodes, totalCount, hasNextPage } = await getRequest(URL);

                if (typeof nodes !== 'undefined' || typeof totalCount !== 'undefined' || typeof hasNextPage !== 'undefined') {
                    setData(nodes);
                    setDataCount(totalCount);
                    setHasNextPage(hasNextPage)
                } else {
                    setData([]);
                    setDataCount(0);
                    hasNextPage(false);
                }

            } catch (e) {
                console.error(e);
            }
        }

        trackPromise(apiCall(), 'fetch')
    }

    async function archiveCall(id) {
        try {
            const URL = ENDPOINTS.calls.archiveCall.replace(':id', id);
            await putRequest(URL);
            fetchCalls()
        } catch (e) {
            console.log(e)
        }
    }

    async function archiveMultipleCalls() {
        try {
            for (const id of checkedCalls) {
                const URL = ENDPOINTS.calls.archiveCall.replace(':id', id);
                await putRequest(URL);
            }
            fetchCalls()
            setAllChecked(false)
            setCheckedCalls([])
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>

            <Row>
                <Col>
                </Col>
                <Col className="d-flex justify-content-end"><Button size="sm" color="primary" onClick={archiveMultipleCalls} disabled={!checkedCalls.length}>Archive selected</Button></Col>
            </Row>

            <br />

            <LoadingOverlay active={fetchPromise} spinner={<Spinner />} styles={{
                overlay: (base) => ({
                    ...base,
                    background: 'rgba(220,220,220,0.5)'
                })
            }}
            >
                <Table
                    data={data}
                    dataCount={dataCount}
                    columns={COLUMNS}
                    checkedList={checkedCalls}
                    setCheckedList={setCheckedCalls}
                    allChecked={allChecked}
                    setAllChecked={setAllChecked}
                />
            </LoadingOverlay>

            <Paginator
                dataCount={dataCount}
                hasNextPage={hasNextPage}
                activePage={activePage}
                handlePageChange={(value) => setActivePage(value)}
                checkedList={checkedCalls}
            />
        </div>
    )
}
