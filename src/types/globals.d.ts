import { z } from 'zod';
import { ApiErrorResponseSchema } from '@/constants';

export {};

declare global {
  // Get keys from object of type T
  type KeysMatching<O, T> = { [K in keyof O]: O[K] extends T ? K : never }[keyof O & string];

  type ModalDetails = {
    isOpen: boolean;
    closeModal: () => void;
    title: string;
  };

  type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;
}
