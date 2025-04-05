'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Call } from '../types';
import { formatTime, formatDuration, getCallStatusText, getCallStatusClass } from '../utils/helpers';

interface CallCardProps {
  call: Call;
  onArchive: (call: Call) => void;
}

const CallCard: React.FC<CallCardProps> = ({ call, onArchive }) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/calls/${call.id}`);
  };

  const handleArchive = (e: React.MouseEvent) => {
    e.stopPropagation();
    onArchive(call);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-4 mb-2 border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={handleViewDetails}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-3">
          {/* Call direction icon */}
          <div className="mt-1">
            {call.direction === 'inbound' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M14.414 7l3.293-3.293a1 1 0 00-1.414-1.414L13 5.586V4a1 1 0 10-2 0v4.003a.996.996 0 00.617.921A.997.997 0 0012 9h4a1 1 0 100-2h-1.586z" />
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.924 2.617a.997.997 0 00-.215-.322l-.004-.004A.997.997 0 0017 2h-4a1 1 0 100 2h1.586l-3.293 3.293a1 1 0 001.414 1.414L16 5.414V7a1 1 0 102 0V3a.997.997 0 00-.076-.383z" />
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            )}
          </div>
          
          {/* Call info */}
          <div>
            <h3 className="font-medium text-gray-900">{call.from}</h3>
            <p className="text-sm text-gray-500">to {call.to}</p>
            <div className="mt-1 flex items-center space-x-2">
              <span className={`text-xs font-medium ${getCallStatusClass(call)}`}>
                {getCallStatusText(call)}
              </span>
              <span className="text-xs text-gray-500">
                via {call.via}
              </span>
            </div>
          </div>
        </div>
        
        {/* Time and action buttons */}
        <div className="flex flex-col items-end">
          <span className="text-sm text-gray-500">{formatTime(call.created_at)}</span>
          <span className="text-xs text-gray-400 mt-1">{formatDuration(call.duration)}</span>
          
          <div className="mt-2">
            <button
              className={`text-xs px-2 py-1 rounded ${
                call.is_archived 
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
              onClick={handleArchive}
            >
              {call.is_archived ? 'Unarchive' : 'Archive'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Notes indicator */}
      {call.notes && call.notes.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center text-gray-500 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {call.notes.length} note{call.notes.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  );
};

export default CallCard; 