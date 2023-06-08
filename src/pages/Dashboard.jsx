import React, { useContext, useEffect, useState } from "react";
import callService from "../services/call";
import loginService from "../services/login";
import { UserContext } from "../context/UserContext";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Text,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
  Center,
  useToast,
  Select,
  Input,
  Flex,
  Spacer,
} from "@chakra-ui/react";

import { Navigate } from "react-router-dom";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

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
        console.log("HANDLE REFERET DATA", newData);
        login(newData);
      } catch (error) {
        console.log(error.response);
      }
    };

    const intRefresh = setInterval(handleRefresh, 9 * 60 * 1000); //refresh every 9 mins

    return () => intRefresh;
  }, []);

  useEffect(() => {
    const handleData = async () => {
      try {
        const callData = await callService.getAll(user);

        console.log("Initial UE");
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
        console.log("PG UE");
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
      console.log("arch data", callData);
      console.log("id", id, typeof id);
      console.log("fulldata", data);

      const newArr = data.nodes.map((node, index) => {
        console.log("Node id", node.id, typeof node.id);
        return node.id === id ? callData : node;
      });

      console.log("YAAR:", newArr);
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
          console.log("Node id", node.id, typeof node.id);
          return node.is_archived === true;
        });

        console.log("YAAR:", newArr);
        setData((prevData) => ({
          ...prevData,
          nodes: newArr,
        }));

        break;

      case "unarchived":
        const newArr1 = altData.nodes.filter((node, index) => {
          console.log("Node id", node.id, typeof node.id);
          return node.is_archived === false;
        });

        console.log("YAAR:", newArr1);
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
    console.log("data selected", dateValue, typeof dateValue);

    const newArr = altData.nodes.filter((node, index) => {
      console.log("Node id", node.created_at, typeof node.created_at);
      return changeDate(node.created_at) === dateValue;
    });

    console.log("YAAR:", newArr);
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
      <Heading as="h1" p="20px" boxSizing="border-box" alignSelf="flex-start">
        Turing Technologies Frontend Test
      </Heading>
      <Box p="20px" boxSizing="border-box">
        <HStack>
          <form>
            <HStack>
              <FormLabel>Filter By</FormLabel>
              <Select w="130px" placeholder="Status" onChange={handleFilter}>
                <option value="all">All</option>
                <option value="archived">Archived</option>
                <option value="unarchived">Unarchived</option>
              </Select>
            </HStack>
          </form>
          <Spacer />
          <form onSubmit={handleDateChange}>
            <HStack>
              <FormLabel>Group By</FormLabel>
              <Input
                w="150px"
                placeholder="Select Date and Time"
                size="md"
                type="date"
                value={selectedDate}
                onChange={filterDate}
              />
              <Button type="submit">Group</Button>
            </HStack>
          </form>
        </HStack>
      </Box>
      <Box p="20px" boxSizing="border-box">
        <TableContainer
          bg="white"
          border="1px solid"
          borderColor="gray.400"
          p="20px"
          boxSizing="border-box"
        >
          <Table size="sm" p="20px" boxSizing="border-box">
            <Thead>
              <Tr>
                <Th>CALL TYPE</Th>
                <Th>DIRECTION</Th>
                <Th>DURATION</Th>
                <Th>FROM</Th>
                <Th>TO</Th>
                <Th>VIA</Th>
                <Th>CREATED AT</Th>
                <Th>STATUS</Th>
                <Th>ACTION</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data !== null &&
                data !== undefined &&
                data.nodes !== null &&
                data.nodes !== undefined &&
                data.nodes.map((node) => (
                  <Tr key={node.id}>
                    <Td>
                      {node.call_type === "voicemail" ? (
                        <Text color="blue.400">Voice Mail</Text>
                      ) : node.call_type === "missed" ? (
                        <Text color="red.400">Missed</Text>
                      ) : (
                        <Text color="green.400">Answered</Text>
                      )}
                    </Td>
                    <Td>{node.direction}</Td>
                    <Td>
                      {
                        <>
                          {fixDuration(node.duration)}
                          <Text size="sm" color="blue">
                            ({node.duration} seconds)
                          </Text>
                        </>
                      }
                    </Td>
                    <Td>{node.from}</Td>
                    <Td>{node.to}</Td>
                    <Td>{node.via}</Td>
                    <Td>{changeDate(node.created_at)}</Td>
                    <Td>
                      {node.is_archived ? (
                        <Button
                          bg="teal.100"
                          color="teal.500"
                          size="sm"
                          variant="ghost"
                          minW="100px"
                          id={node?.id}
                          onClick={archiveCall}
                        >
                          Archived
                        </Button>
                      ) : (
                        <Button
                          bg="gray.100"
                          color="gray.500"
                          size="sm"
                          variant="ghost"
                          minW="100px"
                          id={node?.id}
                          onClick={archiveCall}
                        >
                          Unarchived
                        </Button>
                      )}
                    </Td>
                    <Td>
                      <Button
                        onClick={handleOpen}
                        size="sm"
                        variant="solid"
                        colorScheme="blue"
                        id={node?.id}
                      >
                        Add Note
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      {isClicked && openedNode !== null && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader borderBottom="1px" borderColor="gray.200">
              Add Notes
              <Text fontSize="sm" color="blue">
                Call ID {openedNode && openedNode.id}
              </Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box mb="10px" mt="5px">
                <HStack>
                  <Text as="b" minW="120px">
                    Call Type
                  </Text>
                  {openedNode !== null &&
                  openedNode.call_type === "voicemail" ? (
                    <Text minW="120px" color="blue.400">
                      Voice Mail
                    </Text>
                  ) : openedNode.call_type === "missed" ? (
                    <Text minW="120px" color="red.400">
                      Missed
                    </Text>
                  ) : (
                    <Text minW="120px" color="green.400">
                      Answered
                    </Text>
                  )}
                </HStack>
                <HStack>
                  <Text as="b" minW="120px">
                    Duration
                  </Text>
                  <Text minW="120px"> {fixDuration(openedNode.duration)} </Text>
                </HStack>
                <HStack>
                  <Text as="b" minW="120px">
                    From
                  </Text>
                  <Text minW="120px">{openedNode.from}</Text>
                </HStack>
                <HStack>
                  <Text as="b" minW="120px">
                    To
                  </Text>
                  <Text minW="120px">{openedNode.to}</Text>
                </HStack>
                <HStack>
                  <Text as="b" minW="120px">
                    Via
                  </Text>
                  <Text minW="120px">{openedNode.via}</Text>
                </HStack>
              </Box>
              <form>
                <FormControl>
                  <FormLabel>Add Notes</FormLabel>
                  <Textarea
                    value={newNote}
                    onChange={handleNote}
                    placeholder="Add Notes"
                    type="text"
                    name="notes"
                  />
                </FormControl>
              </form>
            </ModalBody>

            <ModalFooter borderTop="1px" borderColor="gray.200">
              <Center>
                <Button
                  id={openedNode?.id}
                  colorScheme="blue"
                  w="400px"
                  onClick={addNote}
                >
                  Save
                </Button>
              </Center>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <Box
        paddingInline="20px"
        boxSizing="border-box"
        alignItems="center"
        justifyContent="center"
      >
        <HStack>
          <Button
            variant="ghost"
            leftIcon={<ChevronLeftIcon />}
            onClick={prevPage}
          ></Button>
          {data &&
            totalLength &&
            totalLength.map((value) => (
              <Button
                key={value}
                variant="ghost"
                onClick={handleClickPage}
                value={value}
              >
                {value}
              </Button>
            ))}
          <Button
            leftIcon={<ChevronRightIcon />}
            onClick={nextPage}
            variant="ghost"
          ></Button>
        </HStack>
      </Box>
      <Box>
        <Text>
          Result{" "}
          {data !== null && pageNumber !== null && data.totalCount !== null && (
            <>
              {pageNumber + 1} -{" "}
              {totalLength &&
              data &&
              Number(pageNumber + 1 * 10) < data.totalCount
                ? Number(pageNumber + 1 * 10)
                : data.totalCount}{" "}
              of {data && data.totalCount}
            </>
          )}
        </Text>
      </Box>
    </Flex>
  ) : (
    <Navigate replace to="/" />
  );
};

export default Dashboard;
