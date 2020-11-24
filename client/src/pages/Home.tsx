import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <p>Home page</p>
      <Link to="/login">
        <button type="button">Login Page</button>
      </Link>
    </div>
  );
};

export default Home;
