'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { login } from '@/api';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import { setAccessToken, setRefreshToken } from '@/utils/localStorage';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  // TODO: Display errors
  const [error, setError] = useState(''); // eslint-disable-line no-unused-vars

  const submitForm = async () => {
    const response = await login(username, password);
    if (response === null) {
      setError('There was some problem. Try again later.');
      return;
    }
    const accessToken = response?.access_token;
    const refreshToken = response?.refresh_token;

    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      router.push('/');
      return;
    }

    setError('There was some problem. Try again later.');
  };

  return (
    <main className="flex-1 flex items-center justify-center bg-cream">
      <div className="bg-white w-4/5 max-w-[720px] px-6 py-12 rounded-sm">
        <form className="flex flex-col gap-8">
          <InputField
            name="username"
            label="User Name"
            placeholder="Email"
            value={username}
            onChange={setUsername}
            required
          />
          <InputField
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
            required
          />
          <Button color="blue" className="w-fit" onClick={submitForm}>
            Log in
          </Button>
        </form>
      </div>
    </main>
  );
}
