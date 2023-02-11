import { callTypeColorMap, COLORS } from "@/shared/constants";
import { firstLetterUppercase, secondsToMinutesString } from "@/shared/helper";
import { CallList, CallNode, ListFilterOptions } from "@/shared/types";
import { Button, Col, Row, Table, Typography } from "antd";
import { format } from "date-fns";
import { useState } from "react";
import AddNoteModal from "./add-note-modal";
import ListFilter from "./list-filter";

const { Text, Paragraph, Title } = Typography;

interface Props extends CallList {
  onPageChange: (page: number, pageSize: number) => void;
  activePage: number;
  isLoading: boolean;
}

export default function List({
  isLoading,
  totalCount,
  nodes,
  onPageChange,
  activePage,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState<CallNode | null>(null);
  const [filter, setFilter] = useState<ListFilterOptions>("All");

  const findRequiredNode = (id: string) => {
    return nodes.find((node) => node.id === id);
  };

  const onAddNote = (id: string) => {
    const requiredNode = findRequiredNode(id) as CallNode;
    setShowModal(true);
    setSelectedNode(requiredNode);
  };

  const fitlerNodes = (nodes: CallNode[]) => {
    let filteredNodes = nodes;

    if (filter === "Archived") {
      filteredNodes = nodes.filter((node) => node.is_archived);
    } else if (filter === "Unarchive") {
      filteredNodes = nodes.filter((node) => !node.is_archived);
    }

    return filteredNodes;
  };

  const filteredNodes = fitlerNodes(nodes);

  const columns = [
    {
      title: "CALL TYPE",
      key: "call_type",
      dataIndex: "call_type",
      render: (callType: string) => {
        return (
          <Text style={{ color: callTypeColorMap[callType] }}>
            {firstLetterUppercase(callType)}
          </Text>
        );
      },
    },
    {
      title: "DIRECTION",
      key: "direction",
      dataIndex: "direction",
      render: (direction: string) => (
        <Text style={{ color: "#325AE7" }}>
          {firstLetterUppercase(direction)}
        </Text>
      ),
    },
    {
      title: "DURATION",
      key: "duration",
      dataIndex: "duration",
      render: (seconds: number) => {
        return (
          <>
            <Paragraph style={{ marginBottom: 0 }}>
              {secondsToMinutesString(seconds)}
            </Paragraph>
            <Paragraph
              style={{ color: "#325AE7", marginBottom: 0 }}
            >{`(${seconds} seconds)`}</Paragraph>
          </>
        );
      },
    },
    {
      title: "FROM",
      key: "from",
      dataIndex: "from",
    },
    {
      title: "TO",
      key: "to",
      dataIndex: "to",
    },
    {
      title: "VIA",
      key: "via",
      dataIndex: "via",
    },
    {
      title: "CREATED AT",
      key: "created_at",
      dataIndex: "created_at",
      render: (date: string) => format(new Date(date), "dd-MM-yyyy"),
    },
    {
      title: "STATUS",
      key: "is_archived",
      dataIndex: "is_archived",
      render: (isArchived: boolean) => {
        return (
          <Text
            style={{
              color: isArchived ? COLORS.green : COLORS.gray,
              padding: "4px",
              backgroundColor: isArchived
                ? COLORS.lighterGreen
                : COLORS.lighterGray,
            }}
          >
            {isArchived ? "Archived" : "Unarchive"}
          </Text>
        );
      },
    },
    {
      title: "ACTIONS",
      key: "actions",
      dataIndex: "id",
      render: (id: string) => (
        <Button size="small" type="primary" onClick={() => onAddNote(id)}>
          Add Note
        </Button>
      ),
    },
  ];

  return (
    <Row justify="center" style={{ flex: 1 }}>
      <Col span={24}>
        <Title level={1} style={{ margin: "40px 0px", fontWeight: "normal" }}>
          Turing Technologies Frontend Test
        </Title>
        <ListFilter filter={filter} setFilter={setFilter} />
        <Table
          loading={{
            spinning: isLoading,
            size: "large",
          }}
          columns={columns}
          dataSource={filteredNodes}
          pagination={{
            position: ["bottomCenter"],
            defaultCurrent: 1,
            total: totalCount,
            showSizeChanger: false,
            onChange: onPageChange,
            current: activePage,
          }}
        />
        {selectedNode && (
          <AddNoteModal
            showModal={showModal}
            setShowModal={setShowModal}
            {...selectedNode}
          />
        )}
      </Col>
    </Row>
  );
}
