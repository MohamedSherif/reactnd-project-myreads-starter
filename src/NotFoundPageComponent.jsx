import React from 'react';

import './App.css'

class NotFoundPageComponent extends React.Component {

  render() {
    return (
      <div className="not-found-page">
        <div className="not-found-title">
          <h1>404 Requested Page Not Found</h1>
        </div>
      </div>
    )
  }
}

export default NotFoundPageComponent;