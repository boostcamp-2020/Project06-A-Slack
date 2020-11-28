import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginRequest } from '@/store/modules/auth';
import { lighten } from 'polished';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Form = styled.form`
  width: 25rem;
  margin: 10rem auto;
`;

const Label = styled.label`
  margin-top: ${(props) => props.theme.size.xxs};
  font-size: ${(props) => props.theme.size.s};
  font-weight: bold;
`;

const Input = styled.input`
  display: block;
  width: 25rem;
  margin: ${(props) => props.theme.size.xxs} 0;
  padding: ${(props) => props.theme.size.xs} 0;
  padding-left: ${(props) => props.theme.size.xxxs};
  border: 1px solid ${(props) => props.theme.color.black9};
  border-radius: 5px;
  outline: 0;
  &:focus {
    transition: 0.3s;
    box-shadow: ${(props) => props.theme.boxShadow.skyblue};
  }
`;

const LoginButton = styled.button`
  width: 25rem;
  margin: ${(props) => props.theme.size.m} 0;
  padding: ${(props) => props.theme.size.m} 0;
  font-size: ${(props) => props.theme.size.m};
  font-weight: bold;
  color: white;
  border-radius: 5px;
  background-color: ${(props) => props.theme.color.main};
  &:hover {
    transition: 0.3s;
    background-color: ${(props) => lighten(0.05, props.theme.color.main)};
  }
`;

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
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label>
          이메일 주소
          <Input
            type="email"
            placeholder="name@work-email.com"
            onChange={handleChangeEmail}
            value={email}
            autoComplete="true"
            required
          />
        </Label>
        <Label>
          비밀번호
          <Input
            type="password"
            placeholder="*********"
            onChange={handleChangePw}
            value={pw}
            autoComplete="true"
            required
          />
          <LoginButton type="submit">로그인</LoginButton>
        </Label>
      </Form>
    </Container>
  );
};

export default LoginBox;
