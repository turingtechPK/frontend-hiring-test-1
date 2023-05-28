/*
  Routes for whole react application
*/

import React from 'react';

// Constants
import URL from './ApplicationUrls';

/* Routes */
const TuringTechFE = React.lazy(() => import('../components/Pages/TuringTechFETest'));

const ROUTES = [
  // First Page
  { path: URL.TURING_TECH_FE_TEST.ALL, component: TuringTechFE },

];

export default ROUTES;