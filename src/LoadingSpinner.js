import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap'

class LoadingSpinner extends Component {
  render() {
    if (!this.props.loading) {
      return null;
    }

    return (
      <div className="align-self-center mx-auto d-flex flex-column align-items-center">
        <Spinner animation="border" variant="info" />
        <small>Loading ...</small>
      </div>
    );
  }
}

export default LoadingSpinner;
