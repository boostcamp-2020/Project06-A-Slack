import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectAuth, AUTH_ACTIONS } from '@/store/modules/auth';

const Input = styled.input`
  display: block;
  margin: 1rem;
`;

const LoginBox = () => {
  const dispatch = useDispatch();

  const { user, isLogin } = useSelector(selectAuth);

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(AUTH_ACTIONS.loginRequest({ email, pw }));
  };

  return (
    <>
      {isLogin ? (
        <Redirect to="/" />
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <Input type="text" placeholder="email" onChange={handleChangeEmail} value={email} />
            <Input type="password" placeholder="********" onChange={handleChangePw} value={pw} />
            <Input type="submit" value="login" />
          </form>
        </div>
      )}
    </>
  );
};

export default LoginBox;
