import React, { useState } from "react";
import { Logo, LogoContainer } from "../signIn/styled.components";
import { Modal, Spin } from "antd";
import {
  FilterContainer,
  GlobalStyle,
  HeaderContainer,
  Heading,
  MainContainer,
  TableContainer,
  Title,
  CustomButton,
  NotesButton,
  LogOutButton,
  DirectionText,
  Text,
  ModalContainer,
  SpinContainer,
} from "./styled.components";
import turingTechLogo from "../../assets/images/TtLogo.png";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CALLS } from "./queries";
import message from "antd/es/message";
import moment from "moment";
import AddNotesModal from "./addNotesModal";
import { useRecoilValue } from "recoil";
import { noteText } from "./atoms";
import { POST_NOTES } from "./mutations";

const CallList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataObject, setDataObject] = useState<any>({});
  const [status, setStatus] = useState("All");
  const note_Text = useRecoilValue(noteText);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  const handleClick = () => {
    localStorage.removeItem("item");
    navigate("/");
  };

  const [postNote] = useMutation(POST_NOTES);

  const { loading, error, data } = useQuery(GET_CALLS, {
    variables: {
      offset: 20.0,
      limit: 100.0,
    },
  });

  React.useEffect(() => {
    if (error) message.error(error.message);
  }, [error, loading]);

  const handleChange = ({ value }: any) => {
    setStatus(value);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    postNote({
      variables: {
        input: {
          activityId: dataObject.id,
          content: note_Text,
        },
      },
    });
  };

  const columns = [
    {
      title: "Call type",
      dataIndex: "call_type",
      key: "call_type",
      render: (text: string) => {
        return (
          <DirectionText value={text}>
            {text.charAt(0).toUpperCase() + text.slice(1)}
          </DirectionText>
        );
      },
    },
    {
      title: "Direction",
      dataIndex: "direction",
      key: "direction",
      render: (text: string) => {
        return (
          <DirectionText value={text}>
            {text.charAt(0).toUpperCase() + text.slice(1)}
          </DirectionText>
        );
      },
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (_key: any) => {
        let f = moment.utc(_key).format("mm ss");
        const time2 = f.split(" ");
        const totalSeconds: number = moment(_key).seconds();
        const final: any = time2.map(
          (val, index) => `${val} ${["minutes", "seconds"][index]}`
        );
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {final}
            <span
              style={{ color: "#325AE7" }}
            >{`(${totalSeconds} seconds)`}</span>
          </div>
        );
      },
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      render: (text: string) => {
        return <Text>{text}</Text>;
      },
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      render: (text: string) => {
        return <Text>{text}</Text>;
      },
    },
    {
      title: "Via",
      dataIndex: "via",
      key: "via",
      render: (text: string) => {
        return <Text>{text}</Text>;
      },
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (data: any) => {
        return moment(data).format("MM-DD-YYYY");
      },
    },
    {
      title: "Status",
      dataIndex: "is_archived",
      key: "is_archived",
      render: (data: any) => {
        if (data === true) {
          return <CustomButton value={"true"}>Archived</CustomButton>;
        } else {
          return <CustomButton value={"false"}>Unarchive</CustomButton>;
        }
      },
    },
    {
      title: "Notes",
      dataIndex: "",
      key: "",

      render: (_data: any, data: any, index: any) => {
        return data[0] ? (
          <p>{data[0]}</p>
        ) : (
          <NotesButton
            onClick={() => {
              showModal();
              setDataObject(_data);
            }}
          >
            Add Note
          </NotesButton>
        );
      },
    },
  ];
  const filterArchieveData = data?.paginatedCalls?.nodes.filter((d: any) => {
    if (d.is_archived) {
      return d;
    }
  });

  const filterUnArchiveData = data?.paginatedCalls?.nodes.filter((d: any) => {
    if (!d.is_archived) {
      return d;
    }
  });
  {
  }
  return (
    <MainContainer>
      <HeaderContainer>
        <LogoContainer>
          <Logo src={turingTechLogo} alt="logo" />{" "}
        </LogoContainer>
        <LogOutButton onClick={handleClick}>Logout</LogOutButton>
      </HeaderContainer>
      <Heading>Turing Technologies Frontend Test</Heading>
      <div>
        <GlobalStyle />
        <FilterContainer>
          <Title>Filter By</Title>
          {/* <GlobalStyle /> */}
          <Select
            labelInValue
            defaultValue={{ value: "Status", label: "Status" }}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              {
                value: "All",
                label: "All",
              },
              {
                value: "Archived",
                label: "Archived",
              },
              {
                value: "Unarchived",
                label: "Unarchived",
              },
            ]}
          />
        </FilterContainer>
      </div>
      <TableContainer>
        {data ? (
          <Table
            dataSource={
              status === "All"
                ? data?.paginatedCalls?.nodes
                : status === "Archived"
                ? filterArchieveData
                : filterUnArchiveData
            }
            columns={columns}
          />
        ) : (
          <SpinContainer>
            <Spin />
          </SpinContainer>
        )}
      </TableContainer>
      <ModalContainer>
        <GlobalStyle />
        <Modal
          title="Add Notes"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={() => setIsModalOpen(false)}
          okText="Save"
        >
          <AddNotesModal props={dataObject} />
        </Modal>
      </ModalContainer>
    </MainContainer>
  );
};

export default CallList;
