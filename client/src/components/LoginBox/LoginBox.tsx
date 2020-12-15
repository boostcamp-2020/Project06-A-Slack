import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { darken } from 'polished';
import { Link } from 'react-router-dom';
import isEmail from 'validator/es/lib/isEmail';
import { loginRequest } from '@/store/modules/auth.slice';
import { FormButton, FormInput as Input, FormLabel as Label } from '@/styles/shared/form';
import { WarningIcon, GoogleLogoIcon } from '@/components';
import { IconBox, WarningText } from '@/components/EmailBox/EmailBox';
import { flex } from '@/styles/mixin';
import { useAuthState } from '@/hooks';
import LoadingSvg from '@/public/icon/loading.svg';

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${flex('center', 'flex-start', 'column')};
`;

const Title = styled.div`
  font-size: 2.15rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem auto 1rem auto;
  color: #453841;
`;

const DescText = styled.div`
  color: ${(props) => props.theme.color.black4};
  font-size: 1rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  width: 25rem;
  margin: 0 auto 1.5rem auto;
`;

const SignupButton = styled(FormButton)`
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

const LoadingIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const LoginButton = styled(FormButton)`
  ${flex()}
`;

const LoadingButton = styled(FormButton)`
  height: 50px;
  cursor: initial;
  ${flex()}
`;

const LineWithText = styled.div`
  width: 25rem;
  ${flex()};
  position: relative;
  margin: 1rem 0;
`;

const LineText = styled.div`
  padding: 0 20px;
  padding-bottom: 3px;
  margin-top: 0.5rem;
  flex-shrink: 0;
  font-weight: bold;
  font-size: 0.9rem;
  color: ${(props) => props.theme.color.black8};
`;

const Line = styled.hr`
  border: none;
  border-top: 1px solid ${(props) => props.theme.color.lightGray1};
  flex: 1;
`;

const GoogleLoginBox = styled.a`
  ${flex()};
  flex-shrink: 0;
  border: 2px solid ${(props) => props.theme.color.googleColor};
  border-radius: 5px;
  width: 25rem;
  height: 50px;
`;

const GoogleText = styled.span`
  color: ${(props) => props.theme.color.googleColor};
  font-weight: 800;
  font-size: 1.2rem;
  margin-left: 0.8rem;
`;

const LoginBox: React.FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [valid, setValid] = useState(true);
  const [loginFailed, setLoginFailed] = useState(false);
  const { login: loginState } = useAuthState();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setValid(true);
    setLoginFailed(false);
  };

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
    setLoginFailed(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setValid(false);
      return;
    }
    dispatch(loginRequest({ email, pw }));
  };

  useEffect(() => {
    if (loginState.err?.response?.status === 401) {
      setLoginFailed(true);
    }
  }, [loginState.err]);

  return (
    <Container>
      <Title>로그인</Title>
      <DescText>로그인하려면 사용하는 Google 계정이나 이메일 주소로 계속해 주세요.</DescText>
      <GoogleLoginBox href="/api/oauth/google">
        <GoogleLogoIcon size="18px" />
        <GoogleText>Google로 계속</GoogleText>
      </GoogleLoginBox>
      <LineWithText>
        <Line />
        <LineText>또는</LineText>
        <Line />
      </LineWithText>
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
        </Label>
        {loginFailed && (
          <WarningBox>
            <IconBox>
              <WarningIcon />
            </IconBox>
            <WarningText>이메일 또는 비밀번호가 일치하지 않습니다.</WarningText>
          </WarningBox>
        )}
        {loginState.loading ? (
          <LoadingButton type="submit">
            <LoadingIcon src={LoadingSvg} />
          </LoadingButton>
        ) : (
          <LoginButton type="submit">로그인</LoginButton>
        )}
        <Link to="/verify">
          <SignupButton type="button">회원가입</SignupButton>
        </Link>
      </Form>
    </Container>
  );
};

export default LoginBox;
