"use client";
import { useState, useEffect } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import {
  PAGINATED_CALLS_QUERY,
  ADD_NOTE_MUTATION,
  ARCHIVE_CALL_MUTATION,
  ON_UPDATE_CALL_SUBSCRIPTION,
} from "@/lib/queries";
import { Table, Button, Tag, Pagination, Spin, Select, Space } from "antd";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import Image from "next/image";
import { Modal, Form, Input, message } from "antd";
import { useMutation } from "@apollo/client";
import Cookies from "js-cookie";

export default function CallsList() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);
  const [noteForm] = Form.useForm();
  const router = useRouter();

  const { loading, error, data, refetch } = useQuery(PAGINATED_CALLS_QUERY, {
    variables: { offset, limit },
    fetchPolicy: "network-only",
  });

  const [addNote] = useMutation(ADD_NOTE_MUTATION);
  const [archiveCall] = useMutation(ARCHIVE_CALL_MUTATION);
  const { data: subscriptionData } = useSubscription(
    ON_UPDATE_CALL_SUBSCRIPTION,
    {
      variables: { id: selectedCall?.id || null },
      skip: !selectedCall,
      onSubscriptionData: ({ subscriptionData }) => {
        if (subscriptionData.data?.onUpdateCall) {
          refetch();
          message.info(
            `Call updated: ${subscriptionData.data.onUpdateCall.id}`
          );
        }
      },
    }
  );

  const handleAddNote = async () => {
    try {
      const values = await noteForm.validateFields();

      await addNote({
        variables: {
          input: {
            activityId: updatedCall.id,
            content: values.note,
          },
        },
      });

      message.success("Note added successfully");

      // Clear modal state
      noteForm.resetFields();
      setIsModalOpen(false);

      // ✅ Refetch updated call list
      await refetch();
    } catch (err) {
      message.error("Error adding note: " + err.message);
    }
  };

  const handleArchiveCall = async (callId) => {
    try {
      await archiveCall({ variables: { id: callId } });
      message.success("Call archive status updated");
      refetch(); // Refresh list
    } catch (error) {
      message.error("Error archiving call: " + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    Cookies.remove("access_token");
    router.push("/login");
  };

  const groupCallsByDate = (callsArray) => {
    return callsArray.reduce((groups, call) => {
      const date = dayjs(call.created_at).format("YYYY-MM-DD");
      if (!groups[date]) groups[date] = [];
      groups[date].push(call);
      return groups;
    }, {});
  };

  useEffect(() => {
    refetch();
  }, [offset, limit, refetch]);

  const updatedCall = subscriptionData?.onUpdateCall || selectedCall;

  // if (loading)
  //   return <Spin size="large" style={{ justifyContent: "center" }} />;
  if (error) return <p>Error: {error.message}</p>;

  const calls = data?.paginatedCalls?.nodes || [];
  const totalCount = data?.paginatedCalls?.totalCount || 0;

  // Apply filter to calls data
  const filteredCalls = calls.filter((call) => {
    if (filter === "all") return true;
    if (filter === "archived") return call.is_archived === true;
    if (filter === "unarchived") return call.is_archived === false;
    if (["missed", "voicemail", "answered"].includes(filter))
      return call.call_type === filter;
    return true;
  });

  const formatDuration = (seconds) => {
    const totalMinutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${totalMinutes} minutes ${remainingSeconds} seconds`;
  };

  const groupedCalls = groupCallsByDate(filteredCalls);

  const getCallTypeLabel = (callType) => {
    let color = "#000";
    let label = "";

    switch (callType) {
      case "missed":
        color = "#ff4d4f";
        label = "Missed";
        break;
      case "voicemail":
        color = "#1677ff";
        label = "Voice Mail";
        break;
      case "answered":
        color = "#13c2c2";
        label = "Answered";
        break;
      default:
        label = callType;
    }

    return <span style={{ color, fontWeight: 500 }}>{label}</span>;
  };

  const getDirectionLabel = (direction) => {
    let label = direction === "inbound" ? "Inbound" : "Outbound";
    return <span style={{ color: "#1677ff", fontWeight: 500 }}>{label}</span>;
  };

  const getStatusTag = (isArchived) => {
    return isArchived ? (
      <Tag color="cyan">Archived</Tag>
    ) : (
      <Tag color="default">Unarchive</Tag>
    );
  };

  const columns = [
    {
      title: "CALL TYPE",
      dataIndex: "call_type",
      key: "call_type",
      render: (callType) => getCallTypeLabel(callType),
    },
    {
      title: "DIRECTION",
      dataIndex: "direction",
      key: "direction",
      render: (direction) => getDirectionLabel(direction),
    },
    {
      title: "DURATION",
      dataIndex: "duration",
      key: "duration",
      render: (duration) => (
        <div>
          <div>{formatDuration(duration || 0)}</div>
          <div style={{ color: "#1677ff", fontSize: "12px" }}>
            ({duration || 0} seconds)
          </div>
        </div>
      ),
    },
    {
      title: "FROM",
      dataIndex: "from",
      key: "from",
      render: (from) => from || "-",
    },
    {
      title: "TO",
      dataIndex: "to",
      key: "to",
      render: (to) => to || "-",
    },
    {
      title: "VIA",
      dataIndex: "via",
      key: "via",
      render: (via) => via || "-",
    },
    {
      title: "CREATED AT",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => (date ? dayjs(date).format("DD-MM-YYYY") : "-"),
    },
    {
      title: "STATUS",
      dataIndex: "is_archived",
      key: "status",
      render: (isArchived) => getStatusTag(isArchived),
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              setSelectedCall(record);
              setIsModalOpen(true);
            }}
          >
            Add Note
          </Button>
          <Button
            type="default"
            size="small"
            danger={record.is_archived}
            onClick={() => handleArchiveCall(record.id)}
          >
            {record.is_archived ? "Unarchive" : "Archive"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        // padding: "24px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          padding: "16px 24px",
          borderRadius: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Image
            src="/logo/tt_logo.png"
            alt="Turing Technologies"
            width={230}
            height={30}
            unoptimized={true}
          />
        </div>
        <Button type="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>

      {/* Page Title and Filter */}
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
        }}
      >
        <h1
          style={{ margin: "0 0 16px 0", fontSize: "24px", fontWeight: "600" }}
        >
          Turing Technologies Frontend Test
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>Filter by:</span>
          <Select
            defaultValue="all"
            style={{ width: 120 }}
            onChange={(value) => setFilter(value)}
            options={[
              { value: "all", label: "All" },
              { value: "archived", label: "Archived" },
              { value: "unarchived", label: "Unarchived" },
              { value: "missed", label: "Missed" },
              { value: "voicemail", label: "Voicemail" },
              { value: "answered", label: "Answered" },
            ]}
          />
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden",
          padding: "24px",
        }}
      >
        {loading ? (
          <Table
            columns={columns}
            dataSource={[]}
            loading={true}
            pagination={false}
            size="middle"
          />
        ) : filteredCalls.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#999" }}>
            No table data found
          </div>
        ) : (
          Object.entries(groupedCalls).map(([date, group]) => (
            <div key={date} style={{ marginBottom: 32 }}>
              <h3 style={{ marginBottom: 12 }}>
                {dayjs(date).format("MMMM D, YYYY")}
              </h3>
              <Table
                columns={columns}
                dataSource={group}
                rowKey={(record) => record.id}
                pagination={false}
                size="middle"
                loading={false}
              />
            </div>
          ))
        )}

        {/* Pagination */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <Pagination
            current={offset / limit + 1}
            total={totalCount}
            pageSize={limit}
            showSizeChanger={false}
            onChange={(page, pageSize) => {
              setOffset((page - 1) * pageSize);
              setLimit(pageSize);
            }}
          />
        </div>
        <div
          style={{
            padding: "8px 12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#666", fontSize: "14px" }}>
            {offset + 1} – {Math.min(offset + limit, totalCount)} of{" "}
            {totalCount} results
          </span>
        </div>
      </div>

      <Modal
        title="Add Notes"
        open={isModalOpen}
        onCancel={() => {
          noteForm.resetFields();
          setIsModalOpen(false);
        }}
        width={500}
        footer={[
          <Button
            key="save"
            type="primary"
            onClick={handleAddNote}
            style={{ width: "calc(100% - 20px)", margin: "0 10px" }}
          >
            Save
          </Button>,
        ]}
      >
        {updatedCall && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1677ff",
                paddingBottom: "16px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              Call ID: {updatedCall.id}
            </div>

            {/* Call info grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                rowGap: 12,
                columnGap: 24,
                fontSize: 14,
                alignItems: "center",
              }}
            >
              {/* Label */}
              <div style={{ fontWeight: 600 }}>Call Type</div>
              <div style={{ fontWeight: 600 }}>
                {getCallTypeLabel(updatedCall.call_type)}
              </div>

              <div style={{ fontWeight: 600 }}>Duration</div>
              <div style={{ fontWeight: 600 }}>
                {formatDuration(updatedCall.duration || 0)}
              </div>

              <div style={{ fontWeight: 600 }}>From</div>
              <div style={{ fontWeight: 600 }}>{updatedCall.from || "-"}</div>

              <div style={{ fontWeight: 600 }}>To</div>
              <div style={{ fontWeight: 600 }}>{updatedCall.to || "-"}</div>

              <div style={{ fontWeight: 600 }}>Via</div>
              <div style={{ fontWeight: 600 }}>{updatedCall.via || "-"}</div>
            </div>

            {/* Notes Section */}
            <Form form={noteForm} layout="vertical">
              <Form.Item
                name="note"
                label={
                  <span style={{ fontWeight: 600, fontSize: 14 }}>Notes</span>
                }
                rules={[{ required: true, message: "Please input a note!" }]}
                style={{ marginBottom: 0 }}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Add Notes"
                  style={{ resize: "none", fontSize: 14 }}
                />
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
}
