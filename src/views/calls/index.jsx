import React from "react";
import { CustomTable, CustomBtn } from "../../components";
import {
  Flex,
  Tag,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Box,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import { coloumnData } from "../../constants/columns.data";
import { useFetchAPI } from "../../hooks/useFetchAPI";
import { API_URL } from "../../config";
import { useState, useContext, useEffect } from "react";
import { TokenContext } from "../../context/tokenContext";

function CallList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useContext(TokenContext);
  const [note, setNote] = useState("");
  const [dataSource, setDataSource] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(1000);
  const [record, setRecord] = useState();
  const [bool, setBool] = useState(false);

  if (dataSource) {
    console.log(dataSource);
  }

  const handleAddNote = async (id) => {
    try {
      const response = await fetch(`${API_URL.CALLS}/${id}/note`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: note,
        }),
      });

      const data = await response.json();
      // console.log(data);
      setNote("");
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleArchive = async (id) => {
    try {
      const response = await fetch(`${API_URL.CALLS}/${id}/archive`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setBool(!bool);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const archiveCol = {
    title: "STATUS",
    dataIndex: "is_archived",
    render: (id, record, text) => {
      return (
        <Flex>
          <Tag
            variant="subtle"
            cursor="pointer"
            textAlign="center"
            bg={record.is_archived ? "#eefbfa" : "#eeeeee"}
            borderRadius="2px"
            textColor={record.is_archived ? "#6ddbd0" : "#8c8c8c"}
            onClick={() => {
              handleArchive(record.id);
            }}
          >
            {record.is_archived ? "Archived" : "UnArchive"}
          </Tag>
        </Flex>
      );
    },
    key: "is_archived",
    filters: [
      {
        text: "Archived",
        value: true,
      },
      {
        text: "UnArchived",
        value: false,
      },
    ],
    onFilter: (value, record) => record.is_archived === value,
  };

  const noteCol = {
    title: "ACTIONS",
    dataIndex: "id",
    render: (id, record, text) => {
      return (
        <CustomBtn
          text="Add Note"
          color="#4f46f8"
          cursor="pointer"
          width="80px"
          onClick={() => {
            onOpen();
            setRecord(record);
          }}
        />
      );
    },
  };
  const editableCols = [...coloumnData, archiveCol, noteCol];

  useEffect(() => {
    const fetchCallList = async () => {
      const response = await useFetchAPI(
        `${API_URL.CALLS}?offset=${offset}&limit=${limit}`,
        token
      );
      if (response) {
        setDataSource(response.nodes);
        setLimit(response.totalCount);
      }
    };

    fetchCallList();
  }, [bool]);

  return (
    <Flex height="100vh" flexDirection="column" padding="10px">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom="1px solid #ebedf0">
            <Text fontSize="xl">Add Notes</Text>
            <Text fontSize="sm" color="#4f46f8">
              Call ID {record?.id}
            </Text>
            <ModalCloseButton color="#4f46f8" />
          </ModalHeader>
          <ModalBody>
            <Flex padding="10px" flexDirection="column">
              <Flex>
                <Text fontSize="sm" fontWeight="bold" width="20%">
                  Call Type
                </Text>
                <Text fontSize="sm" color="blue" textTransform="capitalize">
                  {record?.call_type}
                </Text>
              </Flex>

              <Flex>
                <Text fontSize="sm" fontWeight="bold" width="20%">
                  Duration
                </Text>
                <Text fontSize="sm" fontWeight="semibold">
                  {Math.floor(record?.duration / 60)} minutes and{" "}
                  {record?.duration % 60} seconds
                </Text>
              </Flex>
              <Flex>
                <Text fontSize="sm" fontWeight="bold" width="20%">
                  From{"    "}
                </Text>
                <Text fontSize="sm" fontWeight="semibold">
                  {record?.from}
                </Text>
              </Flex>
              <Flex>
                <Text fontSize="sm" fontWeight="bold" width="20%">
                  To
                </Text>
                <Text fontSize="sm" fontWeight="semibold">
                  {record?.to}
                </Text>
              </Flex>
              <Flex marginBottom="30px">
                <Text fontSize="sm" fontWeight="bold" width="20%">
                  Via
                </Text>
                <Text fontSize="sm" fontWeight="semibold">
                  {record?.via}
                </Text>
              </Flex>
              <Box>
                <Text fontSize="sm" fontWeight="semibold">
                  Notes
                </Text>
                <Textarea
                  placeholder="Add Notes"
                  onChange={(e) => setNote(e.target.value)}
                  value={note}
                />
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter borderTop="1px solid #ebedf0">
            <CustomBtn
              text="Save"
              color="#4f46f8"
              onClick={() => {
                handleAddNote(record?.id);
                onClose();
              }}
              width="full"
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Text
        fontWeight="semibold"
        fontSize="2xl"
        marginBottom="40px"
        paddingX="20px"
      >
        Turing Technologies Frontend Test
      </Text>
      {dataSource ? (
        <Box paddingX="20px">
          <Box border="1px solid #ebedf0">
            <CustomTable data={dataSource} cols={editableCols} />
          </Box>
        </Box>
      ) : (
        <Flex justifyContent="center" alignItems="center" height="50vh">
          <Spinner
            thickness="1px"
            size="xl"
            color="#4f46f8"
            width="80px"
            height="80px"
          />
        </Flex>
      )}
    </Flex>
  );
}

export default CallList;
