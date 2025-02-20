"use client";
import { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";

interface Note {
  id: string;
  content: string;
}

interface Call {
  id: string;
  call_type: string;
  duration: number;
  from: string;
  to: string;
  via: string;
  notes: Note[];
}

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
  selectedCall: Call | null;
}

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} Minutes ${remainingSeconds} Seconds`;
};

const NoteModal = ({ isOpen, onClose, onSubmit, selectedCall }: NoteModalProps) => {
  const [noteContent, setNoteContent] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setNoteContent("");
      setError("");
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!noteContent.trim()) {
      setError("Note content cannot be empty");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await onSubmit(noteContent);
      setNoteContent("");
      onClose();
    } catch (err) {
      setError("Failed to save note. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !selectedCall) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center text-black bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="border-b pb-4">
          <h2 className="text-xl font-semibold">Add Notes</h2>
          <p className="text-sm text-gray-600 mt-1">
            Call ID: <span className="text-blue-600">{selectedCall.id}</span>
          </p>
        </div>

        {/* Call Details */}
        <div className="mt-4 grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <p className="text-sm">
              <span className="font-medium">Call Type:</span>{" "}
              <span className="text-blue-600">{selectedCall.call_type}</span>
            </p>
            <p className="text-sm mt-2">
              <span className="font-medium">Duration:</span>{" "}
              {formatDuration(selectedCall.duration)}
            </p>
          </div>
          <div>
            <p className="text-sm">
              <span className="font-medium">From:</span> {selectedCall.from}
            </p>
            <p className="text-sm mt-2">
              <span className="font-medium">To:</span> {selectedCall.to}
            </p>
            <p className="text-sm mt-2">
              <span className="font-medium">Via:</span> {selectedCall.via}
            </p>
          </div>
        </div>

        {/* Existing Notes */}
        {selectedCall.notes && selectedCall.notes.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Previous Notes</h3>
            <div className="max-h-[200px] overflow-y-auto">
              {selectedCall.notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-gray-50 p-3 rounded mb-2 text-sm"
                >
                  {note.content}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Note Input */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add New Note
          </label>
          <textarea
            value={noteContent}
            onChange={(e) => {
              setNoteContent(e.target.value);
              setError("");
            }}
            placeholder="Type your note here..."
            className={`w-full min-h-[100px] p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error && (
            <div className="flex items-center text-red-500 text-sm mt-1">
              <AlertCircle size={16} className="mr-1" />
              {error}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !noteContent.trim()}
            className={`px-4 py-2 bg-[var(--text-secondary)] text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center ${
              isSubmitting ? "opacity-75" : ""
            }`}
          >
            {isSubmitting ? "Saving..." : "Save Note"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;