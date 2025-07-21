"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import {
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  Clock,
  User,
  Calendar,
  Archive,
  Activity,
  Copy,
  Check,
  FileText,
  MessageSquare,
  Voicemail,
  PhoneMissed,
  Edit,
  Trash2,
} from "lucide-react";
import type { Call } from "@/lib/types";

interface AddNoteModalProps {
  open: boolean;
  call: Call | null;
  onClose: () => void;
  onNoteAdded: () => void;
}

export default function AddNoteModal({
  open,
  call,
  onClose,
  onNoteAdded,
}: AddNoteModalProps) {
  const [noteContent, setNoteContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notes, setNotes] = useState(call?.notes || []);
  const { makeAuthenticatedRequest } = useAuth();

  
  useEffect(() => {
    setNotes(call?.notes || []);
  }, [call]);

  const handleCopyCallId = async () => {
    if (!call) return;

    try {
      await navigator.clipboard.writeText(call.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy call ID:", error);
    }
  };

  const handleSubmit = async () => {
    if (!call || !noteContent.trim()) return;

    setLoading(true);
    try {
      const response = await makeAuthenticatedRequest(
        `/calls/${call.id}/note`,
        {
          method: "POST",
          body: JSON.stringify({ content: noteContent.trim() }),
        }
      );

      const updatedCall = await response.json();
      setNotes(updatedCall.notes); 
      setNoteContent("");
      onNoteAdded();
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-GB"),
      time: date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };
  };

  const getCallTypeIcon = (callType: string) => {
    switch (callType) {
      case "voicemail":
        return <Voicemail className="w-5 h-5" />;
      case "answered":
        return <PhoneCall className="w-5 h-5" />;
      case "missed":
        return <PhoneMissed className="w-5 h-5" />;
      default:
        return <Phone className="w-5 h-5" />;
    }
  };

  const getCallTypeColor = (callType: string) => {
    switch (callType) {
      case "voicemail":
        return "text-indigo-600";
      case "answered":
        return "text-green-600";
      case "missed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getDirectionIcon = (direction: string) => {
    return direction === "inbound" ? (
      <PhoneIncoming className="w-4 h-4" />
    ) : (
      <PhoneOutgoing className="w-4 h-4" />
    );
  };

  const getDirectionColor = (direction: string) => {
    return direction === "inbound" ? "text-blue-600" : "text-purple-600";
  };

  if (!call) return null;

  const { date, time } = formatDate(call.created_at);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        className: "rounded-xl shadow-2xl border-0",
        style: { borderRadius: "12px" },
      }}
    >
      <DialogContent className="p-0">
        <div className="bg-white rounded-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-lg bg-gray-50 ${getCallTypeColor(
                  call.call_type
                )}`}
              >
                {getCallTypeIcon(call.call_type)}
              </div>
              <div>
                <h2 className="text-lg font-black text-gray-900 font-avenir-black">
                  Call Details
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500 font-avenir-roman">
                    ID:
                  </span>
                  <code className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded font-mono">
                    {call.id}
                  </code>
                  <button
                    onClick={handleCopyCallId}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Copy Call ID"
                  >
                    {copied ? (
                      <Check className="w-3 h-3 text-green-600" />
                    ) : (
                      <Copy className="w-3 h-3 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <IconButton
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <Close />
            </IconButton>
          </div>

          {/* Call Information Grid */}
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <h3 className="text-xs font-book text-gray-500 uppercase tracking-wide mb-2 font-avenir-book flex items-center">
                    <Activity className="w-3 h-3 mr-1" />
                    Call Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700 font-avenir-book flex items-center">
                        <PhoneCall className="w-3 h-3 mr-2 text-gray-400" />
                        Type
                      </span>
                      <span
                        className={`text-xs font-medium capitalize ${getCallTypeColor(
                          call.call_type
                        )} font-avenir-roman flex items-center`}
                      >
                        {getCallTypeIcon(call.call_type)}
                        <span className="ml-1">
                          {call.call_type === "voicemail"
                            ? "Voice Mail"
                            : call.call_type}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700 font-avenir-book flex items-center">
                        {getDirectionIcon(call.direction)}
                        <span className="ml-2">Direction</span>
                      </span>
                      <span
                        className={`text-xs font-medium capitalize ${getDirectionColor(
                          call.direction
                        )} font-avenir-roman flex items-center`}
                      >
                        {getDirectionIcon(call.direction)}
                        <span className="ml-1">{call.direction}</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700 font-avenir-book flex items-center">
                        <Clock className="w-3 h-3 mr-2 text-gray-400" />
                        Duration
                      </span>
                      <span className="text-xs font-medium text-gray-900 font-avenir-roman">
                        {formatDuration(call.duration)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700 font-avenir-book flex items-center">
                        <Archive className="w-3 h-3 mr-2 text-gray-400" />
                        Status
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          call.is_archived ? "text-green-600" : "text-gray-600"
                        } font-avenir-roman`}
                      >
                        {call.is_archived ? "Archived" : "Active"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <h3 className="text-xs font-book text-gray-500 uppercase tracking-wide mb-2 font-avenir-book flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    Contact Details
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700 font-avenir-book flex items-center">
                        <PhoneOutgoing className="w-3 h-3 mr-2 text-gray-400" />
                        From
                      </span>
                      <span className="text-xs font-medium text-gray-900 font-mono">
                        {call.from}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700 font-avenir-book flex items-center">
                        <PhoneIncoming className="w-3 h-3 mr-2 text-gray-400" />
                        To
                      </span>
                      <span className="text-xs font-medium text-gray-900 font-mono">
                        {call.to}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700 font-avenir-book flex items-center">
                        <Phone className="w-3 h-3 mr-2 text-gray-400" />
                        Via
                      </span>
                      <span className="text-xs font-medium text-gray-900 font-mono">
                        {call.via}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700 font-avenir-book flex items-center">
                        <Calendar className="w-3 h-3 mr-2 text-gray-400" />
                        Date
                      </span>
                      <div className="text-right">
                        <div className="text-xs font-medium text-gray-900 font-avenir-roman">
                          {date}
                        </div>
                        <div className="text-xs text-gray-500 font-avenir-roman">
                          {time}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Divider />

            {/* Existing Notes Section */}
            <div>
              <h3 className="text-sm font-black text-gray-900 mb-3 font-avenir-black flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Existing Notes ({notes.length})
              </h3>
              {notes.length > 0 ? (
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {notes.map((note, index) => (
                    <div
                      key={note.id}
                      className="bg-blue-50 border border-blue-100 rounded-lg p-3"
                    >
                      <div className="flex items-start justify-between">
                        <p className="text-xs text-gray-800 font-avenir-roman leading-relaxed flex-1 mr-3">
                          {note.content}
                        </p>
                        <div className="flex items-center space-x-1 flex-shrink-0">
                          <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-avenir-book">
                            #{index + 1}
                          </span>
                          <button
                            onClick={() => {
                              // Placeholder for edit functionality
                              console.log("Edit note:", note.id);
                            }}
                            className="p-1 hover:bg-blue-200 rounded transition-colors"
                            title="Edit note"
                          >
                            <Edit className="w-3 h-3 text-blue-600" />
                          </button>
                          <button
                            onClick={() => {
                              // Placeholder for delete functionality
                              console.log("Delete note:", note.id);
                            }}
                            className="p-1 hover:bg-red-100 rounded transition-colors"
                            title="Delete note"
                          >
                            <Trash2 className="w-3 h-3 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MessageSquare className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 font-avenir-roman">
                    No notes have been added to this call yet.
                  </p>
                  <p className="text-xs text-gray-400 mt-1 font-avenir-book">
                    Add the first note below.
                  </p>
                </div>
              )}
            </div>

            <Divider />

            {/* Add New Note Section */}
            <div>
              <h3 className="text-sm font-black text-gray-900 mb-3 font-avenir-black flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Add New Note
              </h3>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Enter your note here..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontFamily:
                      '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    fontSize: "14px",
                    "& fieldset": {
                      borderColor: "#e5e7eb",
                    },
                    "&:hover fieldset": {
                      borderColor: "#d1d5db",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#6366f1",
                    },
                  },
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 pt-2">
              <Button
                onClick={onClose}
                variant="outlined"
                sx={{
                  color: "#6b7280",
                  borderColor: "#d1d5db",
                  textTransform: "none",
                  fontFamily:
                    '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                  padding: "8px 20px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  "&:hover": {
                    borderColor: "#9ca3af",
                    backgroundColor: "#f9fafb",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading || !noteContent.trim()}
                sx={{
                  backgroundColor: "#6366f1",
                  color: "white",
                  textTransform: "none",
                  fontFamily:
                    '"AvenirLTStd-Roman", "Avenir LT Std", sans-serif',
                  padding: "8px 20px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  "&:hover": {
                    backgroundColor: "#5855eb",
                  },
                  "&:disabled": {
                    backgroundColor: "#d1d5db",
                    color: "#9ca3af",
                  },
                }}
              >
                {loading ? "Saving..." : "Save Note"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
