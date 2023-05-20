import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { PAGINATED_CALLS_QUERY } from "@/api/query";
import { ARCHIVE_CALL_MUTATION, ADD_NOTE_MUTATION } from "@/api/mutation";
import {
  Paper,
  Center,
  Text,
  Table,
  Divider,
  Select,
  Pagination,
  Modal,
  Button,
  Group,
  Stack,
  Textarea,
  List,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { type Call, type Note } from "@/lib/types";

import {
  secondsToHms,
  FormatDate,
  CallType,
} from "@/components/PaginationUtil";

const PAGE_SIZE = 10;

function PaginatedCallsList() {
  const [opened, { open, close }] = useDisclosure(false);
  const [filter, setFilter] = useState<any>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data } = useQuery(PAGINATED_CALLS_QUERY, {
    variables: {
      offset: (currentPage - 1) * PAGE_SIZE,
      limit: PAGE_SIZE,
    },
  });

  const [calls, setCalls] = useState([]);
  const [selectedCall, setSelectedCall] = useState<Call>();
  const [note, setNote] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const [archiveCall] = useMutation(ARCHIVE_CALL_MUTATION);
  const [addNote] = useMutation(ADD_NOTE_MUTATION);

  const handleArchive = (id: string) => {
    archiveCall({
      variables: {
        id: id,
      },
      refetchQueries: [
        {
          query: PAGINATED_CALLS_QUERY,
          variables: {
            offset: (currentPage - 1) * PAGE_SIZE,
            limit: PAGE_SIZE,
          },
        },
      ],
    });
  };

  const handleAddNote = (id: string) => {
    addNote({
      variables: {
        activityId: id,
        content: note,
      },
      onCompleted: () => {
        close();
        setNote("");
      },
      onError: (error) => {
        console.log(error);
      },

      refetchQueries: [
        {
          query: PAGINATED_CALLS_QUERY,
          variables: {
            offset: (currentPage - 1) * PAGE_SIZE,
            limit: PAGE_SIZE,
          },
        },
      ],
    });
  };

  useEffect(() => {
    if (data) {
      setCalls(data.paginatedCalls.nodes);
      setTotalPages(Math.ceil(data.paginatedCalls.totalCount / PAGE_SIZE));
    }
  }, [data]);

  if (loading) {
    return (
      <Center my={40}>
        <Loader />
      </Center>
    );
  }

  
  if (error) return <div>Error! ${error.message}</div>;

  const filteredCalls = calls.filter((call: Call) => {
    if (filter === "All") return true;
    if (filter === "Archived") return call.is_archived;
    if (filter === "Unarchived") return !call.is_archived;
    return true;
  });

  const sortedCalls = filteredCalls.sort((a: Call, b: Call) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <Paper mt="md">
      <Select
        label="Filter by status"
        data={["All", "Archived", "Unarchived"]}
        value={filter}
        onChange={setFilter}
        color="indigo"
        style={{ width: 200 }}
        my="md"
      />


      <Modal opened={opened} onClose={close} title="Add Note" centered>
        {selectedCall && (
          <>
            <Text color="indigo" size="sm" mt={-5}>
              Call ID: {selectedCall?.id}
            </Text>
            <Divider color="indigo" size="sm" />
            <Group position="apart" my="md">
              <Text fw={700}>Call Type: </Text>{" "}
              {CallType(selectedCall?.call_type)}
            </Group>
            <Group position="apart" my="md">
              <Text fw={700}>Duration: </Text>{" "}
              {secondsToHms(selectedCall?.duration)}
            </Group>
            <Group position="apart" my="md">
              <Text fw={700}>From: </Text> {selectedCall?.from}
            </Group>
            <Group position="apart" my="md">
              <Text fw={700}>To: </Text> {selectedCall?.to}
            </Group>
            <Group position="apart" my="md">
              <Text fw={700}>Via: </Text> {selectedCall?.via}
            </Group>
            <Stack>
              <Text fw={700}>Notes: </Text>
              <List>
                {selectedCall?.notes?.map((note: Note) => (
                  <List.Item key={note.id} my="sm">
                    {note.content}
                  </List.Item>
                ))}
              </List>
              <Textarea
                value={note}
                onChange={(event) => setNote(event.currentTarget.value)}
                placeholder="Add notes here"
              />
            </Stack>
            <Center>
              <Button
                onClick={() => handleAddNote(selectedCall?.id)}
                my="md"
                color="indigo"
                fullWidth
              >
                Save
              </Button>
            </Center>
          </>
        )}
      </Modal>


      <Table withBorder horizontalSpacing="sm" verticalSpacing="md">
        <thead>
          <tr>
            <th>Call Type </th>
            <th>Direction</th>
            <th>Duration</th>
            <th>From</th>
            <th>To</th>
            <th>Via</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedCalls.map((call: Call) => (
            <tr key={call.id}>
              <td>{CallType(call.call_type)}</td>
              <td>
                <Text color="blue">{call.direction.toUpperCase()}</Text>
              </td>
              <td>{secondsToHms(call.duration)}</td>
              <td>{call.from}</td>
              <td>{call.to}</td>
              <td>{call.via}</td>
              <td>{FormatDate(call.created_at)}</td>
              <td>
                {call.is_archived ? (
                  <Button
                    onClick={() => handleArchive(call.id)}
                    variant="light"
                    color="green"
                  >
                    Archived
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleArchive(call.id)}
                    variant="light"
                    color="gray"
                  >
                    Unarchive
                  </Button>
                )}
              </td>
              <td>
                <Button
                  onClick={() => {
                    setSelectedCall(call);
                    open();
                  }}
                  color="indigo"
                >
                  View Action
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Center p="md">
        <Pagination
          color="indigo"
          total={totalPages}
          value={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </Center>
    </Paper>
  );
}

export default PaginatedCallsList;
