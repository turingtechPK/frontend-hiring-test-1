import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CallFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export default function CallFilter({ filter, setFilter }: CallFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const options = ["All", "Archived", "Unarchived"];

  return (
    <div className="relative inline-block text-left pb-3">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-gray-700"
      >
        <span className="text-black">Filter by:</span>
        <span className="text-blue-600 font-medium">Status</span>
        <ChevronDown size={16} className="text-gray-500" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {options.map((status) => (
            <button
              key={status}
              onClick={() => {
                setFilter(status);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100 ${
                filter === status ? "bg-indigo-100 text-indigo-700" : ""
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
