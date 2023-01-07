import { useDispatch, useSelector } from 'react-redux';
import TTLogo from '../../assets/img/tt-logo.png';
import { setAuthenticationStatus } from '../../redux/actions';
import { ReduxState } from '../../redux/reducer/types';

export default function CustomNav() {
  const dispatch = useDispatch();
  const { authenticationStatus } = useSelector((state: ReduxState) => state);
  const logoutHandler = () => {
    dispatch(setAuthenticationStatus('not-authenticated'));
    localStorage.removeItem('access_token');
  };
  return (
    <nav className="tt-navbar">
      <img
        width={300}
        src={TTLogo}
        alt="tt-logo"
        className="d-inline-block align-top"
      />
      {['authenticated', 'loading'].includes(authenticationStatus) ? (
        <button
          onClick={() => logoutHandler()}
          className="btn-tt-lg btn-tt-primary"
        >
          Log out
        </button>
      ) : (
        ''
      )}
    </nav>
  );
}
