import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { addNoteAsync } from '@/features/api';
import { useCallsContext } from '@/pages/calls/hooks';

export function useAddNote(): readonly [
  handleAddNoteAsync: (callId: string, note: string) => Promise<void>,
  isLoading: boolean,
] {
  const { setData } = useCallsContext();

  const [isLoading, setIsLoading] = useState(false);

  const handleAddNoteAsync = async (callId: string, note: string): Promise<void> => {
    setIsLoading(true);

    const result = await addNoteAsync(callId, note);

    if (!result) {
      enqueueSnackbar('Could not add note.', { variant: 'error' });
      setIsLoading(false);
      return;
    }

    enqueueSnackbar('Note Added.', { variant: 'success' });

    setData((data) => {
      if (!data) return data;

      if (data?.nodes) {
        const index = data.nodes.findIndex((call) => call.id === result.id);
        return {
          totalCount: data.totalCount,
          hasNextPage: data.hasNextPage,
          nodes: data.nodes.toSpliced(index, 1, result),
        };
      }

      return { ...data };
    });

    setIsLoading(false);
  };

  return [handleAddNoteAsync, isLoading] as const;
}
