import { Pagnation } from "../components/Pagnation";
import { InfoBox } from "../components/InfoBox";
import { TableCall } from "../components/TableCall";
import { Filter } from "../components/Filter";
import React, { useContext, useEffect, useState } from "react";
import callService from "../services/call";
import loginService from "../services/login";
import { UserContext } from "../context/UserContext";
import { useDisclosure, useToast, Flex } from "@chakra-ui/react";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [altData, setAltData] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalLength, setTotalLength] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [openedNode, setOpenedNode] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [notification, setNotification] = useState(null);
  const [selectedDate, setSelectedDate] = useState(Date);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { user } = useContext(UserContext);
  const { login } = useContext(UserContext);

  useEffect(() => {
    if (notification) {
      toast({
        title: "Notification",
        description: notification.msg,
        duration: 1000,
        isClosable: true,
        status: notification.type,
        position: "top",
      });
    }
  }, [toast, notification]);

  useEffect(() => {
    const handleRefresh = async () => {
      try {
        const newData = await loginService.refreshToken(user, {});
        login(newData);
      } catch (error) {
        console.log(error.response);
      }
    };

    const intRefresh = setInterval(handleRefresh, 9 * 60 * 1000); //refresh every 9 mins

    return () => intRefresh;
  }, [user, login]);

  useEffect(() => {
    const handleData = async () => {
      try {
        const callData = await callService.getAll(user);
        setData(callData);
        setAltData(callData);

        const totalPage = Math.ceil(callData.totalCount / 10);

        const newArr = Array(totalPage).fill(0);
        const numberArray = newArr.map((value, index) => {
          return (value = index + 1);
        });

        setTotalLength(numberArray);
      } catch (error) {
        console.log(error.response);
      }
    };

    handleData();
  }, [user]);

  useEffect(() => {
    const handlePageNumber = async () => {
      try {
        const callData = await callService.getCallsByPage(user, pageNumber, 10);
        setData(callData);
        setAltData(callData);
      } catch (error) {
        console.log(error.response);
      }
    };

    handlePageNumber();
  }, [user, pageNumber]);

  const nextPage = () => {
    setPageNumber((prevCount) => prevCount + 10);
  };

  const prevPage = () => {
    setPageNumber((prevCount) => prevCount - 10);
  };

  const handleClickPage = (event) => {
    setPageNumber((event.target.value - 1) * 10);
  };

  const handleNote = (event) => {
    setNewNote(event.target.value);
  };
  const changeDate = (str) => {
    const date = new Date(str);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const newDate = `${day.toString().padStart(2, "0")}-${month
      .toString()
      .padStart(2, "0")}-${year}`;

    return newDate;
  };

  const fixDuration = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);

    const newDur = `${minutes} minutes ${seconds} seconds`;
    return newDur;
  };

  const handleOpen = async (event) => {
    setIsClicked(true);
    //setOpenedNode(event.target.value);

    const id = event.target.id;

    try {
      const callData = await callService.getCallsById(user, id);
      setOpenedNode(callData);
    } catch (error) {
      console.log(error.response);
    }

    onOpen();
  };

  const addNote = async (event) => {
    const id = event.target.id;

    try {
      const callData = await callService.addNotes(user, id, newNote);
      //console.log("recvddaata", callData);
      setNotification({
        msg: `Added New Note: ${newNote} Call Id: ${callData.id}`,
        type: "success",
      });
    } catch (error) {
      console.log(error.response);
    }

    setNewNote("");
    onClose();
  };

  const archiveCall = async (event) => {
    const id = event.target.id;

    try {
      const callData = await callService.archiveCalls(user, id);

      const newArr = data.nodes.map((node, index) => {
        return node.id === id ? callData : node;
      });

      setData((prevData) => ({
        ...prevData,
        nodes: newArr,
      }));
      const isArch = callData.is_archived ? "Archived" : "Unarchived";

      setNotification({
        msg: `Call Id ${callData.id} is Set to ${isArch}`,
        type: "success",
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleFilter = (event) => {
    const value = event.target.value;

    switch (value) {
      case "all":
        const newArr2 = altData.nodes.filter((node, index) => {
          return node;
        });

        setData((prevData) => ({
          ...prevData,
          nodes: newArr2,
        }));

        break;

      case "archived":
        const newArr = altData.nodes.filter((node, index) => {
          return node.is_archived === true;
        });

        setData((prevData) => ({
          ...prevData,
          nodes: newArr,
        }));

        break;

      case "unarchived":
        const newArr1 = altData.nodes.filter((node, index) => {
          return node.is_archived === false;
        });

        setData((prevData) => ({
          ...prevData,
          nodes: newArr1,
        }));
        break;

      default:
        setData(data);
        break;
    }
  };

  const filterDate = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleDateChange = (event) => {
    event.preventDefault();
    const dateValue = changeDate(selectedDate.toString());

    const newArr = altData.nodes.filter((node, index) => {
      return changeDate(node.created_at) === dateValue;
    });

    setData((prevData) => ({
      ...prevData,
      nodes: newArr,
    }));

    setSelectedDate(Date);
  };

  return user ? (
    <Flex
      direction="column"
      h="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Filter
        handleFilter={handleFilter}
        handleDateChange={handleDateChange}
        selectedDate={selectedDate}
        filterDate={filterDate}
      />
      <TableCall
        data={data}
        fixDuration={fixDuration}
        changeDate={changeDate}
        archiveCall={archiveCall}
        handleOpen={handleOpen}
      />
      {isClicked && openedNode !== null && (
        <InfoBox
          isOpen={isOpen}
          onClose={onClose}
          openedNode={openedNode}
          fixDuration={fixDuration}
          newNote={newNote}
          handleNote={handleNote}
          addNote={addNote}
        />
      )}

      <Pagnation
        prevPage={prevPage}
        data={data}
        totalLength={totalLength}
        handleClickPage={handleClickPage}
        nextPage={nextPage}
        pageNumber={pageNumber}
        Number={Number}
      />
    </Flex>
  ) : (
    <h1>Login First</h1>
  );
};

export default Dashboard;
