import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAsync } from '@/features/api';
import { type LoginFormData } from '@/models';

export function useLogin(): readonly [handleLoginAsync: (data: LoginFormData) => Promise<void>, isLoading: boolean] {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleLoginAsync = async (data: LoginFormData): Promise<void> => {
    setIsLoading(true);
    const result = await loginAsync(data);

    if (result !== null) {
      navigate('/');
    }
    setIsLoading(false);
  };

  return [handleLoginAsync, isLoading] as const;
}
