/*
  500 Page, 
  when there is no page according to given route
*/

import React from 'react';

function Page500(props) {
  return (
    <div className="page-404">
      <div className="card-white">
        <h2>500</h2>
        <div className="content-404">
          <h4>{ 'Internal Server Error' }</h4>
          <p>{ 'The server encountered an internal error and was unable to complete your request.' }</p>
          { 
            !!props.refresh?
              <p className="back404 refresh" onClick={ props.refresh }><i className="cicon-angle-right1"></i>{ 'REFRESH' }</p>:
              <p><a className="back404" href="/"><i className="cicon-angle-right1"></i>{ 'Go to Home Page' }</a></p> 
          }
        </div>
      </div>
    </div>
  );
}
export default Page500;