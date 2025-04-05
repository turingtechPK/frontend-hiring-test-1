'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { callsService } from '../../services/api';
import pusherService from '../../services/pusher';
import { Call } from '../../types';
import { formatDuration, formatDateTime, getCallStatusClass } from '../../utils/helpers';
import Layout from '../../components/Layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Button from '../../components/Button';
import CallNotesModal from '../../components/CallNotesModal';

const ITEMS_PER_PAGE = 10;

// Create a client component that uses searchParams
function CallsPageClient() {
  const searchParams = useSearchParams();
  
  const [calls, setCalls] = useState<Call[]>([]);
  const [filteredCalls, setFilteredCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCalls, setTotalCalls] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  
  // Filters
  const [archiveFilter, setArchiveFilter] = useState<string>('all');
  
  // Load calls from API
  const fetchCalls = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const response = await callsService.getCalls(offset, ITEMS_PER_PAGE);
      
      setCalls(response.nodes);
      setTotalCalls(response.totalCount);
      setTotalPages(Math.ceil(response.totalCount / ITEMS_PER_PAGE));
    } catch (err) {
      setError('Failed to load calls. Please try again.');
      console.error('Error fetching calls:', err);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Apply filters to calls
  useEffect(() => {
    if (!calls.length) {
      setFilteredCalls([]);
      return;
    }
    
    let filtered = [...calls];
    
    // Filter by archive status
    if (archiveFilter !== 'all') {
      filtered = filtered.filter(call => 
        archiveFilter === 'archived' ? call.is_archived : !call.is_archived
      );
    }
    
    setFilteredCalls(filtered);
  }, [calls, archiveFilter]);
  
  // Handle real-time updates
  useEffect(() => {
    // Subscribe to call updates
    const handleCallUpdate = (updatedCall: Call) => {
      setCalls(prevCalls => {
        // Find if the call exists in our current list
        const index = prevCalls.findIndex(call => call.id === updatedCall.id);
        
        if (index !== -1) {
          // Update the existing call
          const newCalls = [...prevCalls];
          newCalls[index] = updatedCall;
          return newCalls;
        } else {
          // If the call doesn't exist in our list, don't add it
          // (it might be from a different page)
          return prevCalls;
        }
      });
    };
    
    pusherService.subscribeToAllCalls(handleCallUpdate);
    
    // Cleanup
    return () => {
      pusherService.unsubscribeFromAllCalls(handleCallUpdate);
    };
  }, []);
  
  // Initial load
  useEffect(() => {
    fetchCalls(currentPage);
  }, [currentPage, fetchCalls]);
  
 
  // Handle add note
  const handleOpenNoteModal = async (call: Call) => {
    setSelectedCall(call);
    
    // Optionally fetch the latest call details to ensure we have the most recent notes
    try {
      const callDetails = await callsService.getCall(call.id);
      setSelectedCall(callDetails);
    } catch (err) {
      console.error('Error fetching call details:', err);
      // We can still show the modal with the data we have from the list
    }
    
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCall(null); // Clear the selected call when closing
  };
  
  const handleAddNote = async (callId: string, noteContent: string) => {
    if (!noteContent.trim()) return;
    
    setIsAddingNote(true);
    
    try {
      const updatedCall = await callsService.addNote(callId, noteContent);
      
      // Update calls with the new note
      setCalls(prevCalls => 
        prevCalls.map(c => 
          c.id === callId ? updatedCall : c
        )
      );
      
      // Close modal after successful note addition
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error adding note:', err);
      setError('Failed to add note. Please try again.');
    } finally {
      setIsAddingNote(false);
    }
  };
  
  // Handle page change
  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Get call type display
  const getCallTypeDisplay = (call: Call): string => {
    if (call.call_type === 'voicemail') {
      return 'Voice Mail';
    } else if (call.call_type === 'answered') {
      return 'Answered';
    }
    return 'Missed';
  };

  // Check for call ID in URL
  useEffect(() => {
    const callId = searchParams.get('id');
    if (callId) {
      // Fetch call details and open modal
      const fetchCallDetails = async () => {
        try {
          const callDetails = await callsService.getCall(callId);
          setSelectedCall(callDetails);
          setIsModalOpen(true);
          
          // Update URL without the parameter to avoid reopening on refresh
          const url = new URL(window.location.href);
          url.searchParams.delete('id');
          window.history.replaceState({}, '', url);
        } catch (err) {
          console.error('Error fetching call details:', err);
        }
      };
      
      fetchCallDetails();
    }
  }, [searchParams]);

  return (
    <Layout>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Turing Technologies Frontend Test</h1>
          
          <div className="flex flex-wrap mb-4 items-center">
            <span className="mr-2 mb-2 sm:mb-0">Filter by:</span>
            <div className="relative w-full sm:w-auto">
              <select
                value={archiveFilter}
                onChange={(e) => setArchiveFilter(e.target.value)}
                className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All</option>
                <option value="archived">Archived</option>
                <option value="unarchived">Unarchived</option>
              </select>
            </div>
          </div>
          
          {loading ? (
            <div className="py-12 flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <p className="text-red-500">{error}</p>
              <Button
                variant="primary"
                onClick={() => fetchCalls(currentPage)}
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">CALL TYPE</TableHead>
                        <TableHead className="font-semibold hidden sm:table-cell">DIRECTION</TableHead>
                        <TableHead className="font-semibold">DURATION</TableHead>
                        <TableHead className="font-semibold hidden md:table-cell">FROM</TableHead>
                        <TableHead className="font-semibold hidden md:table-cell">TO</TableHead>
                        <TableHead className="font-semibold hidden lg:table-cell">VIA</TableHead>
                        <TableHead className="font-semibold hidden md:table-cell">CREATED AT</TableHead>
                        <TableHead className="font-semibold">STATUS</TableHead>
                        <TableHead className="font-semibold">ACTIONS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCalls.map((call) => (
                        <TableRow key={call.id}>
                          <TableCell className={getCallStatusClass(call)}>
                            {getCallTypeDisplay(call)}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">{call.direction === 'inbound' ? 'Inbound' : 'Outbound'}</TableCell>
                          <TableCell>
                            {formatDuration(call.duration)}
                            <div className="text-xs text-gray-500">({call.duration} seconds)</div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{call.from}</TableCell>
                          <TableCell className="hidden md:table-cell">{call.to}</TableCell>
                          <TableCell className="hidden lg:table-cell">{call.via}</TableCell>
                          <TableCell className="hidden md:table-cell">{formatDateTime(call.created_at)}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              call.is_archived ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {call.is_archived ? 'Archived' : 'Unarchive'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="primary"
                              onClick={() => handleOpenNoteModal(call)}
                              className="w-full text-xs sm:text-sm px-2 sm:px-4"
                            >
                              {isAddingNote && selectedCall?.id === call.id ? (
                                <div className="flex items-center justify-center">
                                  <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                                  <span>Adding...</span>
                                </div>
                              ) : (
                                "Add Note"
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {/* Call Notes Modal */}
              <CallNotesModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                call={selectedCall}
                onAddNote={handleAddNote}
                isLoading={isAddingNote}
              />
              
              {/* Pagination */}
              <div className="mt-6 flex items-center justify-center">
                <div className="flex flex-wrap items-center space-x-1 sm:space-x-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-1 sm:p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    &lt;
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show fewer pages on mobile
                    const pageNum = currentPage <= 3 
                      ? i + 1 
                      : currentPage + i - 2;
                      
                    // Skip pages outside valid range
                    if (pageNum <= 0 || pageNum > totalPages) return null;
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded text-sm ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'border hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-1 sm:p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    &gt;
                  </button>
                </div>
              </div>
              
              {totalCalls > 0 && (
                <div className="mt-2 text-center text-xs sm:text-sm text-gray-600">
                  1 – {Math.min(currentPage * ITEMS_PER_PAGE, totalCalls)} of {totalCalls} results
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

// Export the main page component with Suspense boundary
export default function CallsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
    </div>}>
      <CallsPageClient />
    </Suspense>
  );
} 