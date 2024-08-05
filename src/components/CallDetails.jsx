import React, { useState } from "react";

const CallDetailsModal = ({ callData, onClose }) => {
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    console.log("Saving notes:", notes);

    onClose();
  };

  return (
    <div className="font-avenir fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-4xl  text-blue-500 hover:text-red-700  m-2"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-1">Add Notes</h2>
        <p className="pb-4 text-blue-700">Call ID {callData.id}</p>
        <hr className="mb-4" />
        <div className="flex flex-col ">
          <div className="flex py-1">
            <p className="text-gray-600 w-20">Call Type</p>
            <p className="text-blue-700 font-semibold">{callData.call_type}</p>
          </div>
          <div div className="flex  py-1">
            <p className="text-gray-600 w-20">Duration</p>
            <p>{callData.duration} seconds</p>
          </div>
          <div div className="flex  py-1">
            <p className="text-gray-600 w-20">From</p>
            <p>{callData.from}</p>
          </div>
          <div div className="flex  py-1">
            <p className="text-gray-600 w-20">To</p>
            <p>{callData.to}</p>
          </div>
          <div div className="flex  py-1">
            <p className="text-gray-600 w-20">Via</p>
            <p>{callData.via}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-600">Notes</p>
            <textarea
              className="border rounded-md p-2 w-full mt-2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallDetailsModal;
