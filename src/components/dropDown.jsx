// src/components/Dropdown.js
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Dropdown = ({ options, label, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Status");

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option); 
  };

  return (
    <div className="font-avenir relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-between w-38 px-4 py-1 mx-2"
      >
        {label}: {selectedOption}
        <FaChevronDown className="w-3 h-3 m-2 " />
      </button>
      {isOpen && (
        <div className="absolute ml-12 w-64 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
          <div>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-purple-100"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
