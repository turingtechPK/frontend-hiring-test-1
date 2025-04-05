import React, { useState } from 'react';
import { Call } from '../types';
import { formatDuration } from '../utils/helpers';
import Button from './Button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from './ui/dialog';
import { Textarea } from './ui/textarea';

interface CallNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  call: Call | null;
  onAddNote: (callId: string, note: string) => Promise<void>;
  isLoading: boolean;
}

export default function CallNotesModal({ 
  isOpen, 
  onClose, 
  call, 
  onAddNote,
  isLoading
}: CallNotesModalProps) {
  const [noteContent, setNoteContent] = useState('');

  if (!call) return null;

  // Create a simpler handler without event parameter
  const saveNote = async () => {
    if (!noteContent.trim() || !call) return;
    await onAddNote(call.id, noteContent);
    setNoteContent('');
  };

  const getCallTypeDisplay = (): string => {
    if (call.call_type === 'voicemail') {
      return 'Voice Mail';
    } else if (call.call_type === 'answered') {
      return 'Answered';
    }
    return 'Missed';
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-w-[95vw] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg">Add Notes</DialogTitle>
          <p className="text-xs sm:text-sm text-gray-500">Call ID {call.id}</p>
        </DialogHeader>
        
        <div className="space-y-3 py-2 sm:py-4">
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div>
              <h4 className="text-xs sm:text-sm font-medium text-gray-500">Call Type</h4>
              <p className="text-xs sm:text-sm">{getCallTypeDisplay()}</p>
            </div>
            
            <div>
              <h4 className="text-xs sm:text-sm font-medium text-gray-500">Duration</h4>
              <p className="text-xs sm:text-sm">{formatDuration(call.duration)}</p>
              <p className="text-xs text-gray-500">({call.duration} seconds)</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
            <div>
              <h4 className="text-xs sm:text-sm font-medium text-gray-500">From</h4>
              <p className="text-xs sm:text-sm">+{call.from}</p>
            </div>
            
            <div>
              <h4 className="text-xs sm:text-sm font-medium text-gray-500">To</h4>
              <p className="text-xs sm:text-sm">+{call.to}</p>
            </div>
            
            <div>
              <h4 className="text-xs sm:text-sm font-medium text-gray-500">Via</h4>
              <p className="text-xs sm:text-sm">+{call.via}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-2">
          <h4 className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Notes</h4>
          <Textarea
            className="min-h-[80px] text-sm"
            placeholder="Add Notes"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
        </div>
        
        <DialogFooter className="mt-4 sm:mt-6">
          <Button
            type="button"
            variant="primary"
            disabled={!noteContent.trim() || isLoading}
            className="w-full text-sm"
            onClick={saveNote}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 