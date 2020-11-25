import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, AUTH_ACTIONS } from '@/store/modules/auth';

const Home = () => {
  const dispatch = useDispatch();

  const { user, isLogin } = useSelector(selectAuth);

  const handleLogout = () => {
    dispatch(AUTH_ACTIONS.logoutRequest());
  };

  return (
    <div>
      <p>Home page</p>
      {isLogin ? (
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button type="button">Login Page</button>
        </Link>
      )}
    </div>
  );
};

export default Home;
