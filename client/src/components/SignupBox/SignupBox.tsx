import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FormButton, FormInput as Input, FormLabel as Label } from '@/styles/shared/form';
import { WarningIcon } from '@/components';
import { IconBox, WarningText } from '@/components/EmailBox/EmailBox';
import { flex } from '@/styles/mixin';
import { useSignupState } from '@/hooks';
import { signupRequest, resetSignupState } from '@/store/modules/signup.slice';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  font-size: 2.15rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem auto 1rem auto;
  color: #453841;
`;

const Form = styled.form`
  width: 25rem;
  margin: 2rem auto 0 auto;
`;

const SignupButton = styled(FormButton)`
  &:disabled {
    cursor: initial;
    background-color: ${(props) => props.theme.color.lightGray1};
  }
`;

const WarningBox = styled.div`
  margin: 1rem auto;
  color: ${(props) => props.theme.color.warningRed};
  ${flex('center', 'flex-start')};
`;

const passwordRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

const SignupBox: React.FC = () => {
  const dispatch = useDispatch();

  const { email, signup } = useSignupState();
  const [displayName, setDisplayName] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [isValidPw, setIsValidPw] = useState(true);
  const [isSamePw, setIsSamePw] = useState(pw === confirmPw);
  const [isValidDisplayName, setIsValidDisplayName] = useState(true);
  const history = useHistory();

  const checkPassword = (password: string, confirmPassword: string) => {
    if (password === confirmPassword) {
      setIsSamePw(true);
    } else {
      setIsSamePw(false);
    }
  };

  const handleConfirmPwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmPw(value);
    checkPassword(pw, value);
  };

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPw(value);
    checkPassword(value, confirmPw);

    if (!passwordRegex.test(value)) {
      setIsValidPw(false);
    } else {
      setIsValidPw(true);
    }
  };

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDisplayName(value);

    if (!value.trim()) {
      setIsValidDisplayName(false);
    } else {
      setIsValidDisplayName(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      dispatch(signupRequest({ email, pw, displayName }));
      return;
    }
    alert('잘못된 접근입니다');
  };

  useEffect(() => {
    if (signup.status === 200) {
      history.push('/login');
    }
    if (signup.err) {
      alert('서버 오류: 요청 처리 실패');
      dispatch(resetSignupState());
    }
  }, [signup.status]);

  useEffect(() => {
    return () => {
      dispatch(resetSignupState());
    };
  }, []);

  return (
    <Container>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          Display name
          <Input
            type="text"
            placeholder="Display name"
            value={displayName}
            maxLength={40}
            onChange={handleDisplayNameChange}
            autoComplete="off"
            required
          />
        </Label>
        {!isValidDisplayName && (
          <WarningBox>
            <IconBox>
              <WarningIcon />
            </IconBox>
            <WarningText>Display name을 입력해주세요</WarningText>
          </WarningBox>
        )}
        <Label>
          비밀번호
          <Input
            type="password"
            placeholder="*********"
            onChange={handlePwChange}
            value={pw}
            autoComplete="off"
            required
          />
        </Label>
        {!isValidPw && (
          <WarningBox>
            <IconBox>
              <WarningIcon />
            </IconBox>
            <WarningText>8~15자의 특수문자/문자/숫자를 포함해주세요</WarningText>
          </WarningBox>
        )}
        <Label>
          비밀번호 확인
          <Input
            type="password"
            placeholder="*********"
            onChange={handleConfirmPwChange}
            value={confirmPw}
            autoComplete="off"
            required
          />
        </Label>
        {!isSamePw && (
          <WarningBox>
            <IconBox>
              <WarningIcon />
            </IconBox>
            <WarningText>비밀번호가 일치하지 않습니다</WarningText>
          </WarningBox>
        )}
        <SignupButton type="submit" disabled={signup.loading || !isValidPw || !isSamePw}>
          회원가입
        </SignupButton>
      </Form>
    </Container>
  );
};

export default SignupBox;
