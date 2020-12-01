import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { darken } from 'polished';
import { Link } from 'react-router-dom';
import isEmail from 'validator/es/lib/isEmail';
import { loginRequest } from '@/store/modules/auth';
import {
  FormButton as LoginButton,
  FormInput as Input,
  FormLabel as Label,
} from '@/styles/shared/form';
import { WarningIcon } from '@/components';
import { IconBox, WarningText } from '@/components/EmailBox/EmailBox';
import { flex } from '@/styles/mixin';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Form = styled.form`
  width: 25rem;
  margin: 10rem auto;
`;

const SignupButton = styled(LoginButton)`
  border: 1px solid ${(props) => props.theme.color.main};
  color: ${(props) => props.theme.color.main};
  background-color: white;
  margin-top: 0;
  &:hover {
    transition: 0.3s;
    background-color: ${darken(0.025, 'white')};
  }
`;

const WarningBox = styled.div`
  margin: 1rem auto;
  color: ${(props) => props.theme.color.warningRed};
  ${flex('center', 'flex-start')};
`;

const LoginBox: React.FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [valid, setValid] = useState(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setValid(true);
  };

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setValid(false);
      return;
    }
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
            onChange={handleEmailChange}
            value={email}
            required
          />
        </Label>
        {!valid && (
          <WarningBox>
            <IconBox>
              <WarningIcon />
            </IconBox>
            <WarningText>유효하지 않은 이메일 주소입니다.</WarningText>
          </WarningBox>
        )}
        <Label>
          비밀번호
          <Input
            type="password"
            placeholder="*********"
            onChange={handlePwChange}
            value={pw}
            required
          />
          <LoginButton type="submit">로그인</LoginButton>
          <Link to="/verify">
            <SignupButton type="button">회원가입</SignupButton>
          </Link>
        </Label>
      </Form>
    </Container>
  );
};

export default LoginBox;
