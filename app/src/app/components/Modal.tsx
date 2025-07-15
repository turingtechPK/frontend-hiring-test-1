import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  headerContent?: React.ReactNode;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, headerContent, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-0 relative">
        <div className="flex items-center justify-between px-8 pt-8 pb-4 border-b border-gray-200">
          <div className="flex flex-col">
            {title && <h2 className="text-2xl font-semibold text-black leading-tight">{title}</h2>}
            {headerContent}
          </div>
          <button
            className="text-2xl text-gray-400 hover:text-gray-600 ml-4"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="px-8 pt-6 pb-8">{children}</div>
      </div>
    </div>
  );
} 