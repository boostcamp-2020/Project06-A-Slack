import React, { useState } from 'react';
import styled from 'styled-components';
import isEmail from 'validator/es/lib/isEmail';
import { useDispatch } from 'react-redux';
import { FormInput as Input, FormButton } from '@/styles/shared/form';
import { flex } from '@/styles/mixin';
import { WarningIcon } from '@/components';
import { useSignupState } from '@/hooks';
import { verifyEmailSendRequest } from '@/store/modules/signup';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  width: 30rem;
  margin: 4rem auto 2rem auto;
`;

const Title = styled.div`
  font-size: 2.3rem;
  font-weight: bold;
  margin: 0 auto 2rem auto;
  ${flex()}
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
    cursor: wait;
  }
`;

const EmailBox = () => {
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState(true);
  const {
    verify: { loading },
  } = useSignupState();

  const dispatch = useDispatch();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setValid(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setValid(false);
      return;
    }
    dispatch(verifyEmailSendRequest({ email }));
  };

  return (
    <Container>
      <Header>
        <Title>우선 이메일 입력하기</Title>
        <SubTitle>
          <b>직장에서 사용하는 이메일 주소</b>를 사용하는 것이 좋습니다.
        </SubTitle>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="name@work-email.com"
          onChange={handleEmailChange}
          value={email}
          required
        />
        {!valid && (
          <WarningBox>
            <IconBox>
              <WarningIcon color="#D73A49" />
            </IconBox>
            <WarningText>유효하지 않은 이메일 주소입니다.</WarningText>
          </WarningBox>
        )}
        <Button disabled={loading} type="submit">
          인증 코드 전송
        </Button>
      </Form>
    </Container>
  );
};

export default EmailBox;
