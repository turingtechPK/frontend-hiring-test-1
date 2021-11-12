import React from 'react';
import ActivityIndicator from 'react-activity-indicator';
import 'react-activity-indicator/src/activityindicator.css'

function LoaderComponent() {
    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
          <ActivityIndicator number={5}
          diameter={40}
          borderWidth={1}
          duration={300}
          activeColor="#66D9EF"
          borderColor="white"
          borderRadius="50%" />
          </div>
    )
}

export default LoaderComponent;
