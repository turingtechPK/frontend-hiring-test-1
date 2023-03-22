import React from "react";
import { Table } from "antd";
import {
  Flex,
  Button,
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
} from "@chakra-ui/react";
import { coloumnData } from "../../constants/columns.data";
import { useFetchAPI } from "../../hooks/useFetchAPI";
import { API_URL } from "../../config";
import { useState, useContext, useEffect } from "react";
import { TokenContext } from "../../context/tokenContext";
import { usePostAPI } from "../../hooks/usePostAPI.JS";

function CallList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useContext(TokenContext);
  const [note, setNote] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(250);
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
      console.log(data);
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
        <Flex justifyContent="center">
          <Tag
            colorScheme={record.is_archived ? "green" : "gray"}
            variant="subtle"
            cursor="pointer"
            textAlign="center"
            onClick={() => {
              handleArchive(record.id);
            }}
          >
            {record.is_archived ? "Archived" : "UnArchived"}
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
        <Tag
          colorScheme="blue"
          variant="subtle"
          cursor="pointer"
          onClick={() => {
            onOpen();
            setRecord(record);
          }}
        >
          Add Note
        </Tag>
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
    <Flex justifyContent="center" height="100vh">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom="1px solid #ebedf0">
            <Text fontSize="xl">Add Notes</Text>
            <Text fontSize="sm" color="blue">
              {record?.id}
            </Text>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Box padding="10px">
              <Flex gap="30px">
                <Text fontSize="sm" fontWeight="semibold">
                  Call Type
                </Text>
                <Text fontSize="sm" color="blue">
                  {record?.call_type}
                </Text>
              </Flex>

              <Flex gap="30px">
                <Text fontSize="sm" fontWeight="semibold">
                  Duration
                </Text>
                <Text fontSize="sm">{record?.duration}</Text>
              </Flex>
              <Flex gap="30px">
                <Text fontSize="sm" fontWeight="semibold">
                  From{"    "}
                </Text>
                <Text fontSize="sm">{record?.from}</Text>
              </Flex>
              <Flex gap="30px">
                <Text fontSize="sm" fontWeight="semibold">
                  To
                </Text>
                <Text fontSize="sm">{record?.to}</Text>
              </Flex>
              <Flex gap="30px" marginBottom="30px">
                <Text fontSize="sm" fontWeight="semibold">
                  Via
                </Text>
                <Text fontSize="sm">{record?.via}</Text>
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
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                handleAddNote(record?.id);
                onClose();
              }}
              width="full"
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Table dataSource={dataSource} columns={editableCols} />
    </Flex>
  );
}

export default CallList;
