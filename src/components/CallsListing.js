import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Card, Button } from "antd";
import ReactPaginate from "react-paginate";
import { DownSquareOutlined } from "@ant-design/icons";
import CallDetailModal from "./CallDetailModal";

const mainURL = process.env.REACT_APP_API_URL;
// const access_token = localStorage.getItem("token");
const { Meta } = Card;

const CallsListing = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setcurrentPage] = useState(0);
  const data = calls;

  useEffect(() => {
    fetchCalls();
  }, []);

  const handlePageChange = (selectedObject) => {
    setcurrentPage(selectedObject.selected);
    fetchCalls();
  };

  const fetchCalls = () => {
    generateToken().then((res) => {
      console.log("RESS", res);
      if (res === 401) {
        // localStorage.removeItem("token");
        refreshToken();
      }
      setPageCount(res.data.totalCount);
      setCalls(res.data.nodes);
      setLoading(true);
    });
  };

  const refreshToken = async () => {
    try {
      const user = {
        username: "hirakhan",
        password: "hira.123",
      };
      const response = await axios.post(mainURL + `auth/login`, user);
      //   accessToken = response.data.access_token;
      localStorage.setItem("token", response.data.access_token);
      //   console.log("AAAAA---", accessToken);
      //   console.log("Token from call", response.data);
      return response;
      //   const token = localStorage.getItem("token");
      //   const config_req = {
      //     headers: { Authorization: `Bearer ${token}` },
      //   };
      //   const response = await axios.post(
      //     mainURL + `auth/refresh-token`,
      //     config_req
      //   );
      //   console.log("New Token", response.data.access_token);
      //   if (response.status === 200) {
      //     // Set new token in local storage.
      //     localStorage.setItem("token", response.data.access_token);
      //   } else {
      //     // Remove the previous token
      //     localStorage.removeItem("token");
      //   }
      //   return response;
    } catch (e) {
      const err = e;
      if (err.response) {
        console.log(err.response.status);
      }
      console.log(e);
    }
  };

  const generateToken = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const config_req = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get(
        mainURL + `calls?offset=${currentPage}&limit=10`,
        config_req
      );
      console.log(response.data);
      return response;
    } catch (e) {
      const err = e;
      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
      console.log(e);
      return err.response.status;
    }
  };

  return (
    <div>
      {/* {loading && calls.map((data) => <div key={data.id}></div>)} */}
      <p>Call Logs</p>
      <List
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <>
              {" "}
              {item.from} <CallDetailModal detail={item} />{" "}
            </>
          </List.Item>
        )}
      />

      <div className="call-listing"></div>
      {loading ? (
        <ReactPaginate
          pageCount={pageCount}
          pageRange={2}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"container"}
          previousLinkClassName={"page"}
          breakClassName={"page"}
          nextLinkClassName={"page"}
          pageClassName={"page"}
          disabledClassNae={"disabled"}
          activeClassName={"active"}
        />
      ) : (
        <div>Nothing to display</div>
      )}
    </div>
  );
};

export default CallsListing;
