import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import CallsTable from './Components/CallsTable';
import Login from './Components/Login';
import { ReduxState } from './redux/reducer/types';
import { setAuthenticationStatus } from './redux/actions/index';
import Loader from './Components/Loader/index';
import CustomNav from './Components/CustomNav';

function App() {
  const { authenticationStatus } = useSelector((state: ReduxState) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('access_token'))
      dispatch(setAuthenticationStatus('authenticated'));
    else dispatch(setAuthenticationStatus('not_authenticated'));
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <CustomNav />
      {authenticationStatus === 'authenticated' ? (
        <div className="call-container">
          <CallsTable />
        </div>
      ) : authenticationStatus === 'loading' ? (
        <div className="login-container">
          <Loader text=" Logging you in " />
        </div>
      ) : (
        <div className="login-container">
          <Login />
        </div>
      )}
    </>
  );
}

export default App;
