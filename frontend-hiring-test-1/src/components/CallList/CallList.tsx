/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  CallListContainer,
  CustomAntdSelect,
  Custompagination,
  FilterDiv,
  Title,
} from "./CallList.style.ts";
import axios from "axios";
import CallTable from "./Table/CallTable.tsx";
import { Space } from "antd";
import Pusher from "pusher-js";
import { APP_KEY, APP_CLUSTER } from "../../services/pusherConfig.ts";

interface Call {
  id: string;
  call_type: string;
  direction: string;
  duration: number;
  from: string;
  to: string;
  via: string;
  created_at: string;
  is_archived: boolean;
}
const CallList: React.FC = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [totalCalls, setTotalCalls] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedStatus, setSelectedStatus] = useState<string>("All"); // Add this line

  const pageSize = 9;

  const groupCallsByDate = (calls) => {
    const groupedCalls = {};

    calls.forEach((call) => {
      const date = new Date(call.created_at).toLocaleDateString();

      if (!groupedCalls[date]) {
        groupedCalls[date] = [];
      }

      groupedCalls[date].push(call);
    });

    // Sort the keys (dates) in reverse order
    const sortedDates = Object.keys(groupedCalls).sort(
      (a, b) => new Date(b) - new Date(a)
    );

    const sortedGroupedCalls = {};
    sortedDates.forEach((date) => {
      sortedGroupedCalls[date] = groupedCalls[date];
    });

    return sortedGroupedCalls;
  };

  const sortedGroupedCalls = groupCallsByDate(calls);

  const filteredCalls = calls.filter((call) => {
    if (selectedStatus === "All") {
      return true; // Show all calls
    } else if (selectedStatus === "Archived") {
      return call.is_archived;
    } else if (selectedStatus === "Unarchive") {
      return !call.is_archived;
    }
    return false;
  });

  const filteredGroupedCalls = groupCallsByDate(filteredCalls);
  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.get(
          `https://frontend-test-api.aircall.dev/calls?offset=${
            (currentPage - 1) * 10
          }&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setCalls(response.data.nodes);
        setTotalCalls(response.data.totalCount);
      } catch (error) {
        console.error("Error fetching calls:", error);
      }
    };

    fetchCalls();
  }, [currentPage, selectedStatus]);

  useEffect(() => {
    const pusher = new Pusher("d44e3d910d38a928e0be", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("private-aircall");

    channel.bind("update-call", (data) => {
      console.log("Real-time update:", data);
    });

    return () => {
      pusher.unsubscribe("private-aircall");
    };
  }, []);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusFilterChange = (value: string) => {
    setSelectedStatus(value);
  };

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, totalCalls);

  return (
    <CallListContainer>
      <Title> Turing Technologies Frontend Test </Title>
      <FilterDiv>
        <p>Filter By:</p>
        <Space wrap>
          <CustomAntdSelect
            defaultValue="Status"
            onChange={handleStatusFilterChange}
            style={{
              width: 120,
              fontSize: "14px !important",
              color: "#5b53f8 !important",
            }}
            bordered={false}
            options={[
              { value: "All", label: "All" },
              { value: "Archived", label: "Archived" },
              { value: "Unarchive", label: "Unarchive" },
            ]}
          />
        </Space>
      </FilterDiv>
      {Object.keys(sortedGroupedCalls).map((date) => (
        <div key={date}>
          <h2>{date}</h2>
          {filteredGroupedCalls[date] && (
            <CallTable
              calls={filteredGroupedCalls[date]}
              selectedStatus={selectedStatus}
            />
          )}
        </div>
      ))}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Custompagination
          defaultCurrent={1}
          total={totalCalls}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
        <div style={{ marginTop: "10px" }}>
          {`Showing ${startIndex}-${endIndex} of ${totalCalls} results`}
        </div>
      </div>
    </CallListContainer>
  );
};

export default CallList;
