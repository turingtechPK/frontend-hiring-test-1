import React, { useState } from 'react';
import CallList from './components/CallList';
import LoginForm from './components/Login';
import CallDetails from './components/CallDetails';
import Header from './components/Header';

const App = () => {
  const [selectedCallId, setSelectedCallId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const onSelectCall = (callId) => {
    console.log("Call id", callId)
    setSelectedCallId(callId);
  };

  const onLoginSuccess = (token) => {
    setAccessToken(token);
  };
  const onLogout = () => {
    setAccessToken(null);
    localStorage.removeItem('access_token')
  };

  if (!accessToken) {
    return <LoginForm onLogin={onLoginSuccess} />;
  }

  return (
    <div>
      <Header accessToken={accessToken} onLogout={onLogout}/>
      <CallList onSelectCall={onSelectCall} />
      {selectedCallId && (
        <div>
          <CallDetails callId={selectedCallId}/>
          {/* Render the CallDetails component here */}
          {/* Pass the selectedCallId as a prop */}
        </div>
      )}
    </div>
  );
};

export default App;
