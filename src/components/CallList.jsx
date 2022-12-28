import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import CallService from "../services/call.service";
import TokenService from "../services/token.service";
import Call from "./Call";
import { useNavigate } from "react-router-dom";


const CallList = () => {
  const [data, setData] = useState({});
  const [filtered, setFiltered] = useState([])
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [archive, setArchive] = useState(false);
  const navigate = useNavigate();
  const { getListofPaginatedCalls } = CallService;

  useEffect(() => {
    async function fetchData() {
      const token = TokenService.getLocalAccessToken();
      const decodedJwt = TokenService.parseJwt(token);
      if(decodedJwt.exp * 1000 < Date.now()){
        navigate('/')
        TokenService.removeUser();
        return
      }
      const res = await getListofPaginatedCalls(page, 9);
      setData(res.data);
      console.log(res.data)
      setFiltered(res.data.nodes)
      setTotalPages(res.data.totalCount);
    }
    fetchData();
  }, [page, archive, navigate, getListofPaginatedCalls]);

  const handleChange = (event) => {
    let boolean_archive
    if(event.target.value === 'Archived'){
      boolean_archive = true
    }else if(event.target.value === 'All'){
      setFiltered(data.nodes)
      return
    }
    else{
      boolean_archive = false
    }
    setFiltered(data.nodes.filter((arr) => arr.is_archived === boolean_archive ))
  };

  const handlePageChange = (event) => {
    setPage(parseInt(event.target.value));
  };

  return (
    <div>
      <div className="col-sm-2 d-flex m-3">
        <p className="m-2">Filter by:</p>
        <select
          class="form-select form-select-sm"
          aria-label="Default select example"
          onChange={handleChange}
        >
          <option value="All">
            All
          </option>
          <option value="Archived">Archived</option>
          <option value="Unarchived">Unarchived</option>
        </select>
      </div>

      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>CALL TYPE</th>
            <th>DIRECTION</th>
            <th>DURATION</th>
            <th>FROM</th>
            <th>TO</th>
            <th>VIA</th>
            <th>CREATED AT</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {filtered &&
            filtered.map((callData) => {
              return <Call callData={callData} setArchive={setArchive} archive={archive} />;
            })}
        </tbody>
      </Table>
      <div className="d-flex align-items-center">
      <Button className="m-3" onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous page
      </Button>

      <div>
        {[...Array(Math.floor(totalPages/17))].map((_, i) => (
          <button key={i + 1} value={i + 1} onClick={handlePageChange}>
            {i + 1}
          </button>
        ))}
      </div>

      <Button className="m-3" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
        Next page
      </Button>
      </div>
    </div>
  );
};

export default CallList;
