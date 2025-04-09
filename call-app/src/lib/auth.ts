'use client';

import { apolloClient } from './apolloClient';
import { LOGIN_MUTATION, REFRESH_TOKEN_MUTATION } from '@/features/calls/graphql/auth';

export async function login(username: string, password: string) {
  const { data } = await apolloClient.mutate({
    mutation: LOGIN_MUTATION,
    variables: { input: { username, password } },
  });

  const { access_token, user } = data.login;
  localStorage.setItem('access_token', access_token);
  return user;
}

export async function refreshToken() {
  const { data } = await apolloClient.mutate({
    mutation: REFRESH_TOKEN_MUTATION,
  });

  const { access_token, user } = data.refreshToken;
  localStorage.setItem('access_token', access_token);
  return user;
}

export function logout() {
  localStorage.removeItem('access_token');
}
