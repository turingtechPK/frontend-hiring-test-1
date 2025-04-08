import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNote } from "../api/noteApi";

interface call {
  id: string;
  notes?: Array<{
    id: string;
    content: string;
    created_at: string;
  }>;
}

export const useAddNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ activityId, content }: { 
      activityId: string; 
      content: string;
      token: string; 
    }) => addNote(activityId, content),
    
    onSuccess: (updatedCall: call) => {
      queryClient.setQueryData(["call", updatedCall.id], updatedCall);
      
      queryClient.invalidateQueries({ queryKey: ["calls"] });
    },
    
    onError: (error) => {
      console.error("Error adding note:", error);
    },
  });
};

