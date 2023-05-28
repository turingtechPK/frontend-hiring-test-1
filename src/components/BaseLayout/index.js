/* 
  Main Layout for application.
  It contains header, footer, body, routes
*/

import React, { useEffect, useState, Suspense, useRef } from 'react';

import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

// Constants
import APP_URL from '../../constants/ApplicationUrls';
import ROUTES from '../../constants/Routes';

// Components
import Loading from '../Loading';

import { Layout } from 'antd';
import TuringHeader from '../Common/TuringHeader';


// Style
import './style.scss'

const { Header, Content } = Layout;

function BaseLayout() {

  const prevCountRef = useRef();
  let { pathname } = useLocation();
 
  useEffect(() => {
    prevCountRef.current = pathname;
  });


  return (
    <Layout className="main-app">
      <TuringHeader showLogOut={true}/>
      <Layout className="main-container">

        <Content className="main-section">
          <Suspense fallback={<Loading />}>
            <Switch>
              {
                ROUTES.map((route, index) => {
                  let {
                    path, exact,
                    component: Component
                  } = route;

                  return (
                    <Route
                      key={index}
                      path={path}
                      exact={exact}
                      render={() => (
                        <Component 
                          previousRoute={ prevCountRef.current }
                        />
                      )}
                    />
                  )
                })
              }

              {/* Default case when application goes to root then what should happens? */}
              <Redirect
                from="/"
                to={APP_URL.TURING_TECH_FE_TEST.ALL}
              />
            </Switch>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;