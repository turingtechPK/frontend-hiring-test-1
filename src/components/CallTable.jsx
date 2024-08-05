import React, { useState, useEffect } from "react";
import { fetchCalls, refreshToken } from '../api/Apicalls';
import CallDetailsModal from "./CallDetails";

const CallTable = ({ filter }) => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);

  useEffect(() => {
    const loadCalls = async () => {
      let token = localStorage.getItem("access_token");
      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        let data = await fetchCalls(token);
        setCalls(data.nodes || []);
        setLoading(false);
      } catch (err) {
        if (err.message.includes("401")) {
          try {
            token = await refreshToken();
            localStorage.setItem("access_token", token);
            const data = await fetchCalls(token);
            setCalls(data.nodes || []);
            setLoading(false);
          } catch (refreshErr) {
            setError(
              `Failed to fetch calls after refreshing token: ${refreshErr.message}`
            );
            setLoading(false);
          }
        } else {
          setError(`Failed to fetch calls: ${err.message}`);
          setLoading(false);
        }
      }
    };

    loadCalls();
  }, []);

  const filteredCalls = calls.filter((call) => {
    if (filter === "Archived") return call.is_archived;
    if (filter === "Unarchived") return !call.is_archived;
    return true;
  });

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}minutes ${remainingSeconds}seconds`;
  };

  const getCallTypeClass = (callType) => {
    switch (callType) {
      case "answered":
        return "text-green-500";
      case "missed":
        return "text-red-500";
      default:
        return "text-blue-700";
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const totalItems = filteredCalls.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCalls = filteredCalls.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleAddNote = (call) => {
    setSelectedCall(call);
    setShowModal(true);
  };

  return (
    <div className="overflow-x-auto font-avenir">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr className="font-semibold text-gray-800 text-sm">
            <th className="px-4 py-2 border-b">CALL TYPE</th>
            <th className="px-4 py-2 border-b">DIRECTION</th>
            <th className="px-4 py-2 border-b">DURATION</th>
            <th className="px-4 py-2 border-b">FROM</th>
            <th className="px-4 py-2 border-b">TO</th>
            <th className="px-4 py-2 border-b">VIA</th>
            <th className="px-4 py-2 border-b">CREATED AT</th>
            <th className="px-4 py-2 border-b">STATUS</th>
            <th className="px-4 py-2 border-b">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {currentCalls.map((call) => (
            <tr className="border" key={call.id}>
              <td className=" px-4 py-2 text-sm">
                <span
                  className={`font-semibold ${getCallTypeClass(
                    call.call_type
                  )}`}
                >
                  {call.call_type}
                </span>
              </td>
              <td className="px-4 py-2 text-sm text-blue-700">
                {call.direction}
              </td>
              <td className=" px-4 py-2 text-sm">
                <span>{formatDuration(call.duration)}</span>
                <br />
                <span className="text-blue-700">({call.duration} seconds)</span>
              </td>
              <td className=" px-4 py-2">{call.from}</td>
              <td className=" px-4 py-2">{call.to}</td>
              <td className=" px-4 py-2">{call.via}</td>
              <td className=" px-4 py-2">
                {new Date(call.created_at).toLocaleDateString()}
              </td>
              <td className=" px-4 py-2">
                <span
                  className={`py-1 px-2 rounded ${
                    call.is_archived
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {call.is_archived ? "Archived" : "Unarchived"}
                </span>
              </td>
              <td className=" px-4 py-2">
                <button
                  className="ml-2  bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={() => handleAddNote(call)}
                >
                  Add Note
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-center justify-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          &lt;
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-3 py-1 border rounded ${
              currentPage === number
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          &gt;
        </button>
      </div>

      {showModal && selectedCall && (
        <CallDetailsModal
          callData={selectedCall}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CallTable;
