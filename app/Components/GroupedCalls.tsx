"use client";
import React from "react";
import { format } from "date-fns";

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

interface Props {
  calls: Call[];
  openNoteModal: (call: Call) => void;
  handleArchive: (callId: string) => void;
}

const GroupedCalls: React.FC<Props> = ({ calls, openNoteModal, handleArchive }) => {
  // Group calls by formatted date
  const groupedCalls = calls.reduce<Record<string, Call[]>>((acc, call) => {
    const date = format(new Date(call.created_at), "dd MMM yyyy"); // Format date
    acc[date] = acc[date] || [];
    acc[date].push(call);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedCalls).map(([date, calls]) => (
        <div key={date}>
          <h2 className="text-lg font-bold text-black mb-2">{date}</h2>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {["Call Type", "Direction", "Duration", "From", "To", "Actions"].map((heading) => (
                    <th key={heading} className="px-4 py-3 text-left text-xs text-black font-bold uppercase tracking-wider">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {calls.map((call) => (
                  <tr key={call.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">{call.call_type}</td>
                    <td className="px-4 py-4">{call.direction}</td>
                    <td className="px-4 py-4">{Math.floor(call.duration / 60)} min</td>
                    <td className="px-4 py-4">{call.from}</td>
                    <td className="px-4 py-4">{call.to}</td>
                    <td className="px-4 py-4">
                      <button onClick={() => openNoteModal(call)} className="bg-[var(--text-secondary)] text-white px-3 py-1 rounded">
                        Add Note
                      </button>
                      <button onClick={() => handleArchive(call.id)} className="ml-2 bg-red-500 text-white px-3 py-1 rounded">
                        {call.is_archived ? "Unarchive" : "Archive"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupedCalls;
