import { useState, useEffect } from "react";
import { api } from "@/app/utils/apiService";
import NoteModal from "./NoteModal";
import CallFilter from "./CallFilter";
import Pagination from "./Pagination";
import GroupedCalls from "./GroupedCalls";

interface Call {
  id: string;
  duration: number;
  is_archived: boolean;
  from: string;
  to: string;
  direction: string;
  call_type: string;
  via: string;
  created_at: string;
  notes: Array<{ id: string; content: string }>;
}

export default function CallsList() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [filteredCalls, setFilteredCalls] = useState<Call[]>([]);
  const [offset, setOffset] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [filter, setFilter] = useState("All");
  const [groupByDate, setGroupByDate] = useState(false);
  const limit = 10;

  const fetchCalls = async () => {
    try {
      const data = await api.getCalls(offset, limit);
      if (data && Array.isArray(data.nodes)) {
        setCalls(data.nodes);
        setTotalResults(data.totalCount);
      } else {
        console.error("Invalid API response:", data);
        setCalls([]);
      }
    } catch (error) {
      console.error("Error fetching calls:", error);
      setCalls([]);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, [offset]);

  useEffect(() => {
    let filtered = calls;
    if (filter === "Archived") {
      filtered = calls.filter((call) => call.is_archived);
    } else if (filter === "Unarchived") {
      filtered = calls.filter((call) => !call.is_archived);
    }
    setFilteredCalls(filtered);
  }, [filter, calls]);

  const handleAddNote = async (content: string) => {
    if (!selectedCall) return;
    try {
      const updatedCall = await api.addNote(selectedCall.id, content);
      setCalls((prevCalls) =>
        prevCalls.map((call) => (call.id === selectedCall.id ? updatedCall : call))
      );
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const openNoteModal = (call: Call) => {
    setSelectedCall(call);
    setIsNoteModalOpen(true);
  };

  const handleArchive = async (callId: string) => {
    try {
      await api.toggleArchive(callId);
      fetchCalls();
    } catch (error) {
      console.error("Error archiving call:", error);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (
      <>
        {minutes} min {remainingSeconds} sec
        <br />
        <span className="text-sm text-blue-500">({seconds} sec)</span>
      </>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const getCallTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "voicemail":
        return "text-blue-600";
      case "answered":
        return "text-green-600";
      case "missed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const groupCallsByDate = (calls: Call[]) => {
    return calls.reduce((groups: { [key: string]: Call[] }, call) => {
      const date = formatDate(call.created_at);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(call);
      return groups;
    }, {});
  };

  const renderTable = (calls: Call[]) => (
    <table className="min-w-full border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          {[
            "Call type",
            "Direction",
            "Duration",
            "From",
            "To",
            "Via",
            "Created at",
            "Status",
            "Actions",
          ].map((heading) => (
            <th
              key={heading}
              className="px-4 py-3 text-left text-xs text-black font-bold uppercase tracking-wider"
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {calls.map((call) => (
          <tr key={call.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-4 py-4 whitespace-nowrap">
              <span className={getCallTypeColor(call.call_type)}>
                {call.call_type.charAt(0).toUpperCase() + call.call_type.slice(1)}
              </span>
            </td>
            <td className="px-4 py-4 text-blue-600 font-medium">
              {call.direction.charAt(0).toUpperCase() + call.direction.slice(1)}
            </td>
            <td className="px-4 py-4 text-gray-700">{formatDuration(call.duration)}</td>
            <td className="px-4 py-4 text-gray-700">{call.from}</td>
            <td className="px-4 py-4 text-gray-700">{call.to}</td>
            <td className="px-4 py-4 text-gray-700">{call.via}</td>
            <td className="px-4 py-4 text-gray-700">{formatDate(call.created_at)}</td>
            <td className="px-4 py-4">
              <span
                className={`px-3 py-2 text-xs font-semibold ${
                  call.is_archived ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                }`}
              >
                {call.is_archived ? "Archived" : "Unarchived"}
              </span>
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="flex space-x-2">
                <button
                  onClick={() => openNoteModal(call)}
                  className="bg-[#4f46f9] text-white px-3 py-1 hover:bg-blue-800 transition-colors flex items-center"
                >
                  <span className="text-sm">Add note</span>
                </button>
                <button
                  onClick={() => handleArchive(call.id)}
                  className={`${
                    call.is_archived ? "bg-gray-600 hover:bg-gray-700" : "bg-red-600 hover:bg-red-700"
                  } text-white px-3 py-1 transition-colors flex items-center`}
                >
                  <span className="text-sm">{call.is_archived ? "Unarchive" : "Archive"}</span>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="px-8 py-8 bg-white">
      <h1 className="text-2xl font-bold mb-6 text-black">Call list</h1>

      <div className="flex justify-between items-center mb-6">
        <CallFilter filter={filter} setFilter={setFilter} />
        <button
          onClick={() => setGroupByDate((prev) => !prev)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded transition-colors"
        >
          {groupByDate ? "Show All" : "Group by Date"}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {groupByDate ? Object.entries(groupCallsByDate(filteredCalls)).map(([date, calls]) => (
          <div key={date} className="mb-8">
            <h2 className="text-lg font-semibold mb-4 px-4">{date}</h2>
            {renderTable(calls)}
          </div>
        )) : renderTable(filteredCalls)}
      </div>

      <Pagination offset={offset} setOffset={setOffset} limit={limit} totalResults={totalResults} />

      <NoteModal isOpen={isNoteModalOpen} onClose={() => setIsNoteModalOpen(false)} onSubmit={handleAddNote} selectedCall={selectedCall} />
    </div>
  );
}
