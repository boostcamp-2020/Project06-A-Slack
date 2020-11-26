import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginRequest } from '@/store/modules/auth';

const Input = styled.input`
  display: block;
  margin: 1rem;
`;

const Label = styled.label``;

const LoginBox = () => {
  const dispatch = useDispatch();

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
    dispatch(loginRequest({ email, pw }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Label>
          이메일 주소
          <Input
            type="text"
            placeholder="email"
            onChange={handleChangeEmail}
            value={email}
            required
          />
        </Label>
        <Label>
          비밀번호
          <Input
            type="password"
            placeholder="********"
            onChange={handleChangePw}
            value={pw}
            required
          />
          <Input type="submit" value="login" />
        </Label>
      </form>
    </>
  );
};

export default LoginBox;
