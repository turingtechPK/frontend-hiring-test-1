import React from "react";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Box,
} from "@chakra-ui/react";

export function TableCall({
  data,

  fixDuration,
  changeDate,

  archiveCall,
  handleOpen,
}) {
  return (
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
  );
}
