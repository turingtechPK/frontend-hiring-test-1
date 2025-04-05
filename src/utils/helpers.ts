import { format, isToday, isYesterday, formatDistanceToNow } from 'date-fns';
import { Call } from '../types';

// Format the call duration from seconds to min:sec
export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Format the created_at date for display in the list
export const formatCallDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  if (isToday(date)) {
    return 'Today';
  }
  
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  
  return format(date, 'MMM dd, yyyy');
};

// Format time for display (e.g., "14:30")
export const formatTime = (dateString: string): string => {
  return format(new Date(dateString), 'HH:mm');
};

// Format a full date and time
export const formatDateTime = (dateString: string): string => {
  return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
};

// Format relative time (e.g., "2 hours ago")
export const formatRelativeTime = (dateString: string): string => {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
};

// Group calls by date
export const groupCallsByDate = (calls: Call[]): { [date: string]: Call[] } => {
  return calls.reduce((groups, call) => {
    const date = formatCallDate(call.created_at);
    
    if (!groups[date]) {
      groups[date] = [];
    }
    
    groups[date].push(call);
    return groups;
  }, {} as { [date: string]: Call[] });
};

// Get call status text based on call_type
export const getCallStatusText = (call: Call): string => {
  if (call.call_type === 'missed') {
    return 'Missed Call';
  } else if (call.call_type === 'answered') {
    return 'Answered Call';
  } else if (call.call_type === 'voicemail') {
    return 'Voicemail';
  }
  return 'Unknown';
};

// Get call direction text
export const getCallDirectionText = (call: Call): string => {
  return call.direction === 'inbound' ? 'Inbound' : 'Outbound';
};

// Get CSS class for call status
export const getCallStatusClass = (call: Call): string => {
  if (call.call_type === 'missed') {
    return 'text-red-500';
  } else if (call.call_type === 'answered') {
    return 'text-green-500';
  } else if (call.call_type === 'voicemail') {
    return 'text-blue-500';
  }
  return '';
}; 