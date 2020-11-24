import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <p>404 Not Found</p>
    </div>
  );
};

export default NotFound;
