import React, { forwardRef } from 'react';
import './LoadingSpinner.scss';

const LoadingSpinner = forwardRef((props, loaderRef) => {
  return (
    <div ref={loaderRef} className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
});

export default LoadingSpinner;
