"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/navigation";
import { getCalls, addNote as apiAddNote, archiveCall as apiArchiveCall } from "../services/api";
import Modal from "../components/Modal";

const PAGE_SIZE = 10;


const statusBadge = (is_archived: boolean) => {
  if (is_archived) {
    return <span className="bg-[#e6fcfa] text-[#5ed6c5] px-3 py-1 rounded font-medium text-sm">Archived</span>;
  }
  return <span className="bg-[#f5f5f5] text-[#bdbdbd] px-3 py-1 rounded font-medium text-sm">Unarchive</span>;
};

function formatDuration(seconds: number) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min} Minutes ${sec} Seconds`;
}

export default function CallsPage() {
  const { user, accessToken, logout } = useAuth();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [calls, setCalls] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const [showModal, setShowModal] = useState(false);
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [noteContent, setNoteContent] = useState("");
  const [noteLoading, setNoteLoading] = useState(false);
  const [noteError, setNoteError] = useState("");


  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsCall, setDetailsCall] = useState<any>(null);

  const [archiveLoadingId, setArchiveLoadingId] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);
    setError("");
    const offset = (page - 1) * PAGE_SIZE;
    getCalls(accessToken as string, offset, PAGE_SIZE)
      .then((data) => {
        setCalls(data.nodes);
        setTotalCount(data.totalCount);
      })
      .catch(() => setError("Failed to load calls"))
      .finally(() => setLoading(false));
  }, [accessToken, page]);


  const filteredCalls = (statusFilter === "All"
    ? calls
    : calls.filter((call) =>
        statusFilter === "Archived" ? call.is_archived : !call.is_archived
      )
  ).slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

 
  const handleAddNote = async () => {
    if (!selectedCall || !noteContent.trim() || !accessToken) return;
    setNoteLoading(true);
    setNoteError("");
    try {
      const updatedCall = await apiAddNote(accessToken as string, selectedCall.id, noteContent);
      setCalls((prev) =>
        prev.map((call) =>
          call.id === selectedCall.id ? { ...call, notes: updatedCall.notes } : call
        )
      );
      setShowModal(false);
      setNoteContent("");
      setSelectedCall(null);
    } catch (e) {
      setNoteError("Failed to add note");
    } finally {
      setNoteLoading(false);
    }
  };

  const handleArchive = async (callId: string) => {
    if (!accessToken) return;
    setArchiveLoadingId(callId);
    try {
      const updatedCall = await apiArchiveCall(accessToken as string, callId);
      setCalls((prev) =>
        prev.map((call) =>
          call.id === callId ? { ...call, is_archived: updatedCall.is_archived } : call
        )
      );
    } catch (e) {
      
    } finally {
      setArchiveLoadingId(null);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };


  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
    
      <header className="w-full h-24 flex items-center px-8 bg-white border-b border-gray-200 justify-between">
        <div className="flex items-center">
          <Image src="/TT Logo.png" alt="Turing Technologies Logo" width={300} height={62} priority />
        </div>
        <button onClick={handleLogout} className="bg-[#5956e9] hover:bg-[#4745c6] text-white font-medium rounded px-8 py-3 text-lg transition-colors cursor-pointer">Log out</button>
      </header>
      <main className="flex flex-col flex-1 mt-12 px-8">
        <h1 className="text-4xl text-black text-left">Turing Technologies Frontend Test</h1>
        <div className="flex items-center gap-2 mt-8 mb-6">
          <span className="text-lg text-gray-700">Filter by:</span>
          <label htmlFor="status" className="sr-only">Status</label>
          <select
            id="status"
            name="status"
            className="text-[#5956e9] font-medium text-lg bg-transparent border-none focus:ring-0 cursor-pointer"
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          >
            <option value="All">All</option>
            <option value="Archived">Archived</option>
            <option value="Unarchive">Unarchived</option>
          </select>
        </div>
     
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full text-left">
            <thead className="bg-[#f7f7fa]">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700">CALL TYPE</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700">DIRECTION</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700">DURATION</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700">FROM</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700">TO</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700">VIA</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700">CREATED AT</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700">STATUS</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredCalls.map((call, idx) => (
                <tr key={call.id} className={idx % 2 === 0 ? "bg-white" : "bg-[#f7f7fa]"}>
                  <td className={`px-4 py-3 cursor-pointer ${call.call_type === "missed" ? "text-[#e14b4b] font-semibold" : call.call_type === "answered" ? "text-[#5ed6c5] font-semibold" : "text-[#5956e9] font-semibold"}`} onClick={() => { setDetailsCall(call); setShowDetailsModal(true); }}>{call.call_type === "voicemail" ? "Voice Mail" : call.call_type.charAt(0).toUpperCase() + call.call_type.slice(1)}</td>
                  <td className={`px-4 py-3 cursor-pointer ${call.direction === "outbound" ? "text-[#5956e9] underline" : "text-[#5ed6c5] underline"}`} onClick={() => { setDetailsCall(call); setShowDetailsModal(true); }}>{call.direction.charAt(0).toUpperCase() + call.direction.slice(1)}</td>
                  <td className="px-4 py-3 text-black cursor-pointer" onClick={() => { setDetailsCall(call); setShowDetailsModal(true); }}>{formatDuration(call.duration)}</td>
                  <td className="px-4 py-3 text-black cursor-pointer" onClick={() => { setDetailsCall(call); setShowDetailsModal(true); }}>{call.from}</td>
                  <td className="px-4 py-3 text-black cursor-pointer" onClick={() => { setDetailsCall(call); setShowDetailsModal(true); }}>{call.to}</td>
                  <td className="px-4 py-3 text-black cursor-pointer" onClick={() => { setDetailsCall(call); setShowDetailsModal(true); }}>{call.via}</td>
                  <td className="px-4 py-3 text-black cursor-pointer" onClick={() => { setDetailsCall(call); setShowDetailsModal(true); }}>{new Date(call.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 cursor-pointer" onClick={() => { setDetailsCall(call); setShowDetailsModal(true); }}>{statusBadge(call.is_archived)}</td>
                  <td className="px-4 py-3">
                    <button className="bg-[#5956e9] hover:bg-[#4745c6] text-white font-medium rounded px-4 py-2 text-sm mr-2 cursor-pointer" onClick={() => { setSelectedCall(call); setShowModal(true); setNoteContent(""); setNoteError(""); }}>Add Note</button>
                    <button
                      className={`bg-gray-300 hover:bg-gray-400 text-black font-medium rounded px-4 py-2 text-sm cursor-pointer ${archiveLoadingId === call.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => handleArchive(call.id)}
                      disabled={archiveLoadingId === call.id}
                    >
                      {archiveLoadingId === call.id ? '...' : call.is_archived ? 'Unarchive' : 'Archive'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex-1" />
   
        <div className="flex flex-col items-center mt-8 mb-8">
          <div className="flex gap-2 items-center justify-center">
            <button
              className="w-8 h-8 flex items-center justify-center rounded transition-colors disabled:opacity-50 text-[#5956e9] hover:bg-[#f2f2f2]"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              aria-label="Previous page"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            {Array.from({ length: Math.ceil(totalCount / PAGE_SIZE) }, (_, i) => (
              <button
                key={i}
                className={`w-8 h-8 flex items-center justify-center rounded transition-colors text-lg font-medium ${page === i + 1 ? "bg-[#5956e9] text-white" : "text-black hover:bg-[#f2f2f2]"}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="w-8 h-8 flex items-center justify-center rounded transition-colors disabled:opacity-50 text-[#5956e9] hover:bg-[#f2f2f2]"
              onClick={() => setPage(page + 1)}
              disabled={page === Math.ceil(totalCount / PAGE_SIZE)}
              aria-label="Next page"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
          <div className="mt-2 text-gray-600 text-sm">
            {`${(page - 1) * PAGE_SIZE + 1} – ${Math.min(page * PAGE_SIZE, totalCount)} of ${totalCount} results`}
          </div>
        </div>
      </main>


      <Modal
        isOpen={showModal && !!selectedCall}
        onClose={() => setShowModal(false)}
        title="Add Notes"
        headerContent={<span className="text-xs text-blue-700 break-all mt-1">Call ID {selectedCall?.id}</span>}
      >
        {selectedCall && (
          <>
            <div className="mb-2 flex flex-col gap-1 text-black">
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 items-baseline">
                <span className="font-bold">Call Type</span>
                <span className={selectedCall.call_type === "missed" ? "text-[#e14b4b] font-semibold" : selectedCall.call_type === "answered" ? "text-[#5ed6c5] font-semibold" : "text-[#5956e9] font-semibold"}>{selectedCall.call_type === "voicemail" ? "Voice Mail" : selectedCall.call_type.charAt(0).toUpperCase() + selectedCall.call_type.slice(1)}</span>
                <span className="font-bold">Duration</span>
                <span>{formatDuration(selectedCall.duration)}</span>
                <span className="font-bold">From</span>
                <span>{selectedCall.from}</span>
                <span className="font-bold">To</span>
                <span>{selectedCall.to}</span>
                <span className="font-bold">Via</span>
                <span>{selectedCall.via}</span>
              </div>
            </div>
            <div className="mb-2 text-black">
              <span className="font-medium">Notes</span>
              <ul className="list-disc ml-6 text-sm mt-1">
                {(selectedCall.notes || []).map((note: any, idx: number) => (
                  <li key={idx}>{note.content}</li>
                ))}
              </ul>
            </div>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 mt-2 mb-4 text-black"
              rows={3}
              placeholder="Add Notes"
              value={noteContent}
              onChange={e => setNoteContent(e.target.value)}
              disabled={noteLoading}
            />
            {noteError && <div className="text-red-500 text-sm mb-2">{noteError}</div>}
            <button
              className="w-full bg-[#5956e9] hover:bg-[#4745c6] text-white font-semibold py-3 rounded transition-colors text-lg"
              onClick={handleAddNote}
              disabled={noteLoading || !noteContent.trim()}
            >
              {noteLoading ? "Saving..." : "Save"}
            </button>
          </>
        )}
      </Modal>

   
      <Modal
        isOpen={showDetailsModal && !!detailsCall}
        onClose={() => setShowDetailsModal(false)}
        title="Call Details"
      >
        {detailsCall && (
          <>
            <div className="mb-2 flex flex-col gap-1 text-black">
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 items-baseline">
                <span className="font-bold">Call ID</span>
                <span>{detailsCall.id}</span>
                <span className="font-bold">Call Type</span>
                <span className={detailsCall.call_type === "missed" ? "text-[#e14b4b] font-semibold" : detailsCall.call_type === "answered" ? "text-[#5ed6c5] font-semibold" : "text-[#5956e9] font-semibold"}>{detailsCall.call_type === "voicemail" ? "Voice Mail" : detailsCall.call_type.charAt(0).toUpperCase() + detailsCall.call_type.slice(1)}</span>
                <span className="font-bold">Direction</span>
                <span>{detailsCall.direction.charAt(0).toUpperCase() + detailsCall.direction.slice(1)}</span>
                <span className="font-bold">Duration</span>
                <span>{formatDuration(detailsCall.duration)}</span>
                <span className="font-bold">From</span>
                <span>{detailsCall.from}</span>
                <span className="font-bold">To</span>
                <span>{detailsCall.to}</span>
                <span className="font-bold">Via</span>
                <span>{detailsCall.via}</span>
                <span className="font-bold">Created At</span>
                <span>{new Date(detailsCall.created_at).toLocaleString()}</span>
                <span className="font-bold">Status</span>
                <span>{statusBadge(detailsCall.is_archived)}</span>
              </div>
            </div>
            <div className="mb-2 text-black">
              <span className="font-bold">Notes</span>
              <ul className="list-disc ml-6 text-sm mt-1">
                {(detailsCall.notes || []).map((note: any, idx: number) => (
                  <li key={idx}>{note.content}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
} 