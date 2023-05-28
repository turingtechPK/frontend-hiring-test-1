/*
  404 Page, 
  when there is no page according to given route
*/

import React from 'react';

function Page404() {
  return (
    <div className="page-404">
      <div className="card-white">
        <h2>404</h2>
        <div className="content-404">
          <h4>SORRY!</h4>
          <p>The Page Your're Looking For Was Not Found</p>
          <p><a className="back404" href="/"><i className="cicon-angle-right1"></i>Go back to home</a></p>
        </div>
      </div>
    </div>
  );
}
export default Page404;