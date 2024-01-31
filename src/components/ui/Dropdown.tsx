'use client';

import { useEffect, useRef, useState } from 'react';
import ChevronDownIcon from '../icons/ChevronDown';

type DropdownOption = {
  name: string;
  value: string;
  selectedDisplay?: string;
};

type DropdownProps = {
  options: DropdownOption[];
  defaultValue: string; // TODO: Check if we can get more precise
  onChange?: (value: string) => void; // eslint-disable-line no-unused-vars
};

export default function Dropdown({ options, defaultValue, onChange }: DropdownProps) {
  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const onfocusout = (event: FocusEvent) => {
        if (!containerRef.current?.contains(event.relatedTarget as Node)) {
          setIsOpen(false);
        }
      };

      containerRef.current.addEventListener('focusout', onfocusout);

      return () => container.removeEventListener('focusout', onfocusout);
    }

    return () => {};
  }, []);

  const changeHandler = (val: string) => {
    setValue(val);
    setIsOpen(false);
    if (onChange) onChange(val);
  };

  const selectedOption = options.find((option) => option.value === value);

  // TODO: Add better error handling
  if (!selectedOption) {
    return null;
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        className="inline-flex items-center gap-4 text-primary px-2 py-1"
        onClick={() => setIsOpen(true)}
      >
        {selectedOption.selectedDisplay || selectedOption.name}
        <span className="size-4">
          <ChevronDownIcon />
        </span>
      </button>
      {isOpen && (
        <div className="absolute bg-white w-48 shadow-sm rounded-sm px-2 py-2">
          {options.map((option) => (
            <button
              type="button"
              className={`w-full px-4 py-2 text-left rounded-sm hover:bg-primary/25 ${
                option.value === value ? 'bg-primary/20 text-primary' : 'bg-white'
              }`}
              key={option.value}
              onClick={() => changeHandler(option.value)}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
