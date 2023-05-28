
import React from 'react';
import { 
  BrowserRouter, 
  Switch, 
  Route 
} from 'react-router-dom'; //https://css-tricks.com/the-hooks-of-react-router/
import Loadable from 'react-loadable';

// Antd
import { notification } from 'antd';

// Constants
import APP_URL from './constants/ApplicationUrls';
import { NOTIFICATION_DURATION } from './constants/General';

// Components
import PrivateRoute from './components/PrivateRoute';
import Loading from './components/Loading';
import Page404 from './components/ErrorPages/Page404';
import Page500 from './components/ErrorPages/Page500';
import Login from './components/Pages/Login';

// Styling
import './assets/sass/style.scss';


// Notification Configuration for whole application
notification.config({
  placement: 'topRight',
  duration: NOTIFICATION_DURATION,
  rtl: false
});

// Base Layout
const BaseLayout = Loadable({
  loader: () => import('./components/BaseLayout'),
  loading: Loading
});


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* 
            Open Routes Here 
          */}

          {/* Login */}
          <Route
            path={ APP_URL.AUTH.LOGIN }
            name={ 'Login' }
            component={ Login }
          />

          {/* Page 404 */}
          <Route
            path={ APP_URL.ERROR.PAGE404 }
            name={ 'Page 404' }
            component={ Page404 }
          />

          {/* Page 500 */}
          <Route
            path={ APP_URL.ERROR.PAGE500 }
            name={ 'Page 500' }
            component={ Page500 }
          />

          {/* Restricted Routes Here */}
          <PrivateRoute 
            component={ BaseLayout } 
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
