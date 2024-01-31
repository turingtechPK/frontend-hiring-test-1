'use client';

// import Pusher from 'pusher-js';
import { APP_AUTH_ENDPOINT, APP_CLUSTER, APP_KEY, BASE_URL } from '@/config';
import { getAccessToken } from '@/utils/localStorage';
import { Call, CallsResponse } from './types';

// TODO: Change any type
async function api(url: string, method: 'GET' | 'POST' | 'PUT', requiresAuth: boolean, body?: any) {
  const headers: any = {
    'Content-Type': 'application/json',
  };
  if (requiresAuth) {
    headers.Authorization = `Bearer ${getAccessToken()}`;
  }

  return fetch(`${BASE_URL}/${url}`, {
    method,
    headers,
    body,
  });
}

export async function login(username: string, password: string) {
  const payload = { username, password };
  const response = await api('auth/login/', 'POST', false, JSON.stringify(payload));

  if (response.ok) {
    const json = await response.json();
    return json;
  }

  return null;
}

export async function getCalls(offset: number) {
  const response = await api(`calls?offset=${offset}&limit=${10}`, 'GET', true);

  if (response.ok) {
    const json: CallsResponse = await response.json();
    return json;
  }

  return null;
}

export async function archiveCall(id: string) {
  const response = await api(`calls/${id}/archive`, 'PUT', true);

  if (response.ok) {
    const json: Call = await response.json();
    return json;
  }

  return null;
}

export async function createNote(id: string, content: string) {
  const response = await api(`calls/${id}/note`, 'POST', true, JSON.stringify({ content }));

  if (response.ok) {
    const json: Call = await response.json();
    return json;
  }

  return null;
}

// export function getPusherInstance() {
//   const pusher = new Pusher(APP_KEY!, {
//     cluster: APP_CLUSTER!,
//     channelAuthorization: {
//       endpoint: APP_AUTH_ENDPOINT!,
//     },
//   });

//   return pusher;
// }
