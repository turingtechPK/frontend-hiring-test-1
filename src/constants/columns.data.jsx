import { Tag } from "@chakra-ui/react";
import { API_URL } from "../config";
import { Text, Box } from "@chakra-ui/react";

export const coloumnData = [
  {
    title: "CALL TYPE",
    dataIndex: "call_type",
    key: "call_type",
    render: (id, record, text) => {
      return (
        <Text
          //captitalise the text
          textTransform="capitalize"
          //set the color of the text red for missed , green for answered and blue for voicemail
          color={
            record.call_type === "missed"
              ? "#cc003f"
              : record.call_type === "answered"
              ? "#00cbba"
              : "#3762e9"
          }
        >
          {record.call_type}
        </Text>
      );
    },
  },
  {
    title: "DIRECTION",
    dataIndex: "direction",
    key: "direction",
    render: (id, record, text) => {
      return (
        <Text
          //captitalise the text
          textTransform="capitalize"
          //set the color of the text red for incoming and green for outgoing
          color="#3762e9"
        >
          {record.direction}
        </Text>
      );
    },
  },
  {
    title: "DURATION",
    dataIndex: "duration",
    key: "duration",
    render: (id, record, text) => {
      return (
        <Box>
          <Text fontWeight="semibold">
            {Math.floor(record.duration / 60)} minutes and{" "}
            {record.duration % 60} seconds
          </Text>
          <Text color="#3762e9" fontSize="xs">
            {" "}
            ({record.duration} seconds)
          </Text>
        </Box>
      );
    },
  },
  {
    title: "FROM",
    dataIndex: "from",
    key: "from",
    render: (id, record, text) => {
      return <Text fontWeight="semibold">{record.from}</Text>;
    },
  },
  {
    title: "TO",
    dataIndex: "to",
    key: "to",
    render: (id, record, text) => {
      return <Text fontWeight="semibold">{record.to}</Text>;
    },
  },
  {
    title: "VIA",
    dataIndex: "via",
    key: "via",
    render: (id, record, text) => {
      return <Text fontWeight="semibold">{record.via}</Text>;
    },
  },
  {
    title: "CREATED AT",
    dataIndex: "created_at",
    key: "created_at",
    render: (id, record, text) => {
      return (
        <Text fontWeight="semibold">
          {
            //convert in DD-MM-YYYY format separated by -
            record.created_at.split("T")[0].split("-").reverse().join("-")
          }
        </Text>
      );
    },
  },
];
