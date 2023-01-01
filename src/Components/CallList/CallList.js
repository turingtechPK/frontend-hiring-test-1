import React from "react";
import axios from "axios";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Button, Select, Table, Tag, Pagination } from "antd";
import "antd/dist/reset.css";
import Logo from "../../Img/Logo.png";
import "./CallList.css";
import "../Modal/NotesModal";
import NotesModal from "../Modal/NotesModal";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const CallList = () => {
  const [filterName, setFilterName] = React.useState("All");
  const [showModal, setShowModal] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [dataCopy, setDataCopy] = React.useState([]);
  const [count, setCount] = React.useState();
  const [current, setCurrent] = React.useState(1);
  const [modalData, setModalData] = React.useState();
  React.useEffect(() => {
    getData();
  }, []);

  // React.useEffect(() => setShowModal(true), [modalData]);

  const getData = async () => {
    await axios
      .get(
        `https://frontend-test-api.aircall.io/calls?offset=${current}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      )
      .then((response) => {
        console.log("DATA: ", response.data);
        filterDataFirstTime(response.data.nodes);
        setDataCopy([...response.data.nodes]);
        setCount(response.data.totalCount);
      })
      .catch((err) => {
        console.log("err: ", err);
        refreshToken();
      });

    refreshToken();
  };

  const refreshToken = () => {
    axios
      .post("https://frontend-test-api.aircall.io/auth/refresh-token", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        localStorage.setItem("access", response.data.access_token);
        //localStorage.setItem("refresh", response.data.refresh_token);
        getData();
      });
  };
  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
    getData();
  };

  const items = [
    {
      key: "1",
      label: (
        <span
          onClick={() => {
            setFilterName("All");
            filterData("All");
          }}
        >
          All
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span
          onClick={() => {
            setFilterName("Archived");
            filterData(true);
          }}
        >
          Archived
        </span>
      ),
      //   label: "",
    },
    {
      key: "3",
      //   label: "",
      label: (
        <span
          onClick={() => {
            setFilterName("Unarchived");
            filterData(false);
          }}
        >
          Unarchieved
        </span>
      ),
    },
  ];

  //filter when data comes first time
  const filterDataFirstTime = (data) => {
    console.log(...data);
    if (filterName === "All") {
      setDataCopy([...data]);
      setData([...data]);
    } else if (filterName === "Archived") {
      setDataCopy([...data]);
      let newData = data.filter((f) => f.is_archived === true);
      setData([...newData]);
    } else if (filterName === "Unarchived") {
      setDataCopy([...data]);
      let newData = data.filter((f) => f.is_archived === false);
      setData([...newData]);
    }
  };

  //when change filter after getting data
  const filterData = (filter) => {
    console.log(filter);
    if (filterName === "All") {
      setData([...dataCopy]);
    } else {
      let newData = dataCopy.filter((f) => f.is_archived === filter);
      console.log("filter: ", newData);
      console.log("OG: ", data);
      setData([...newData]);
    }
  };

  const capitalize = (str) => {
    let letter = str.charAt(0).toUpperCase();
    return letter + str.slice(1);
  };

  const getTimeInMinutes = (time) => {
    const minutes = Math.floor(time / 60);

    const seconds = time % 60;
    return `${minutes} minutes ${seconds} seconds`;
  };
  const columns = [
    {
      title: "CALL TYPE",
      dataIndex: "call_type",
      key: "calltype",
      render: (text) =>
        text === "missed" ? (
          <span span style={{ color: "red" }}>
            {capitalize(text)}
          </span>
        ) : text === "voicemail" ? (
          <span style={{ color: "#4F46F8" }}>{capitalize(text)}</span>
        ) : (
          <span style={{ color: "cyan" }}>{capitalize(text)}</span>
        ),
    },
    {
      title: "DIRECTION",
      dataIndex: "direction",
      key: "direction",
      render: (text) => (
        <span style={{ color: "#4F46F8" }}>{capitalize(text)}</span>
      ),
    },
    {
      title: "DURATION",
      dataIndex: "duration",
      key: "duration",
      render: (text) => (
        <>
          {getTimeInMinutes(text)}
          <div style={{ color: "#4F46F8" }}>{`(${text} Seconds)`}</div>
        </>
      ),
    },
    {
      title: "FROM",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "TO",
      dataIndex: "to",
      key: "to",
    },
    {
      title: "VIA",
      dataIndex: "via",
      key: "via",
    },
    {
      title: "CREATED AT",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) =>
        new Date(text).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      title: "STATUS",
      dataIndex: "is_archived",
      key: "is_archived",
      render: (text) =>
        text ? <Tag color="cyan">Archived</Tag> : <Tag>Unarchived</Tag>,
    },
    {
      title: "ACTIONS",
      //   dataIndex: "actions",
      key: "actions",
      render: (data) => (
        <Button
          type="primary"
          style={{ backgroundColor: "#4f46f8" }}
          onClick={() => {
            setModalData(data);
            setShowModal(true);
          }}
          //   console.log("ROW DAT: ", data)
        >
          Add Note
        </Button>
      ),
    },
  ];

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="calls_container">
      <div className="header">
        <img src={Logo} alt="Logo" className="logo" />
        <Button type="primary" onClick={() => logout()}>
          Log out
        </Button>
      </div>
      <div className="call_wrapper">
        {showModal ? (
          <NotesModal closeModal={closeModal} modalData={modalData} />
        ) : null}
        <h2>Turing Technologies Frontend Test</h2>
        <div className="filter">
          <h5>Filter by:</h5>
          <Dropdown
            menu={{
              items,
              selectable: true,
              defaultSelectedKeys: ["1"],
            }}
          >
            <Space>
              <span style={{ color: "#4F46F8" }}>
                {filterName === "All" ? "Status" : filterName}
              </span>
              <DownOutlined style={{ fontSize: "0.8rem" }} />
            </Space>
          </Dropdown>
        </div>
        <Table columns={columns} dataSource={data} pagination={false} />
        <div className="pagination">
          <Pagination current={current} total={count} onChange={onChange} />
          <h4>
            {current * 10 - 9} - {current * 10} of {count} results
          </h4>
        </div>
      </div>
    </div>
  );
};

export default CallList;
