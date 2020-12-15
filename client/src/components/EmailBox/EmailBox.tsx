import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import isEmail from 'validator/es/lib/isEmail';
import { useDispatch } from 'react-redux';
import { FormButton, FormInput } from '@/styles/shared';
import { flex } from '@/styles/mixin';
import { WarningIcon, LogoBox } from '@/components';
import { useSignupState } from '@/hooks';
import {
  verifyEmailSendRequest,
  checkExistEmailRequest,
  resetCheckExistEmailState,
} from '@/store/modules/signup.slice';
import LoadingSvg from '@/public/icon/loading.svg';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  width: 30rem;
  margin: 2rem auto 1rem auto;
`;

const Title = styled.div`
  font-size: 2.4rem;
  font-weight: bold;
  margin: 1rem auto 1.5rem auto;
  ${flex()}
  color: #453841;
`;

const SubTitle = styled(Title)`
  font-size: ${(props) => props.theme.size.m};
  font-weight: normal;
  & > b {
    font-weight: bold;
  }
`;

const Form = styled.form`
  width: 25rem;
  margin: 0 auto;
`;

const WarningBox = styled.div`
  color: ${(props) => props.theme.color.warningRed};
  ${flex('center', 'flex-start')};
`;

export const IconBox = styled.div`
  padding-left: 0.5rem;
  color: inherit;
  ${flex()};
`;

export const WarningText = styled.div`
  color: inherit;
  ${flex()};
  margin-left: 0.35rem;
  font-size: ${(props) => props.theme.size.s};
`;

const Button = styled(FormButton)`
  &:disabled {
    cursor: initial;
    background-color: ${(props) => props.theme.color.lightGray1};
  }
  ${flex()}
`;

const LoadingButton = styled(FormButton)`
  height: 50px;
  cursor: initial;
  ${flex()}
`;

const LoadingIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const notValidEmailMessage = '유효하지 않은 이메일 주소입니다.';
const existEmailMessage = '이미 가입된 이메일입니다.';

const EmailBox: React.FC = () => {
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState(true);
  const [isExistEmail, setIsExistEmail] = useState(false);
  const { verify, checkExistEmail } = useSignupState();

  const dispatch = useDispatch();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    if (!isEmail(value)) {
      setValid(false);
      return;
    }
    setValid(true);
    dispatch(checkExistEmailRequest({ email: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setValid(false);
      return;
    }
    dispatch(verifyEmailSendRequest({ email }));
  };

  useEffect(() => {
    if (checkExistEmail.status === 200) {
      setIsExistEmail(false);
      return;
    }
    if (checkExistEmail.err) {
      setIsExistEmail(true);
      dispatch(resetCheckExistEmailState());
    }
  }, [checkExistEmail]);

  const warningMessage = !valid ? notValidEmailMessage : existEmailMessage;

  return (
    <Container>
      <LogoBox />
      <Header>
        <Title>우선 이메일 입력하기</Title>
        <SubTitle>
          <b>직장에서 사용하는 이메일 주소</b>를 사용하는 것이 좋습니다.
        </SubTitle>
      </Header>
      <Form onSubmit={handleSubmit} spellCheck="false">
        <FormInput
          type="email"
          placeholder="name@work-email.com"
          onChange={handleEmailChange}
          value={email}
          required
        />
        {(!valid || isExistEmail) && !(verify.loading || checkExistEmail.loading) && (
          <WarningBox>
            <IconBox>
              <WarningIcon />
            </IconBox>
            <WarningText>{warningMessage}</WarningText>
          </WarningBox>
        )}
        {verify.loading || checkExistEmail.loading ? (
          <LoadingButton type="submit">
            <LoadingIcon src={LoadingSvg} />
          </LoadingButton>
        ) : (
          <Button disabled={!valid || isExistEmail} type="submit">
            인증 코드 전송
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default EmailBox;
