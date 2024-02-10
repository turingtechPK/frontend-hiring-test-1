import { z } from 'zod';

export const LS_KEYS = {
  accessToken: 'ACCESS_TOKEN',
  refreshToken: 'REFRESH_TOKEN',
};

export const CALL_STATUS_FILTERS = ['all', 'archived', 'unarchived'];

export const ApiErrorResponseSchema = z.object({
  message: z.string().or(z.string().array()),
  statusCode: z.coerce.number(),
  error: z.string().optional(),
});
