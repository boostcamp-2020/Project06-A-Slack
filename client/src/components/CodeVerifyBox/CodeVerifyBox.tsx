import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import isInt from 'validator/es/lib/isInt';
import isAlpha from 'validator/es/lib/isAlpha';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { flex, focusedInputBoxShadow } from '@/styles/mixin';
import { removeVerifyCode } from '@/store/modules/signup.slice';
import { useSignupState } from '@/hooks';
import { decrypt } from '@/utils/utils';
import { WarningIcon, LogoBox } from '@/components';

const Container = styled.div`
  width: 50rem;
  margin: 0 auto;
  ${flex('center', 'center', 'column')};
`;

const Title = styled.div`
  margin: 0.7rem auto;
  font-size: 2.8rem;
  font-weight: bold;
  color: ${(props) => props.theme.color.black1};
`;

const SubTitle = styled.div`
  margin: 1rem auto 2rem auto;
  font-size: 1.1rem;
  color: ${(props) => props.theme.color.black4};
`;

const BoldText = styled.span`
  font-weight: 800;
`;

const CodeBox = styled.div`
  ${flex()}
  margin: 0 1rem;
  input + input {
    border-left: 1px solid ${(props) => props.theme.color.black8};
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const LeftCodeBox = styled(CodeBox)`
  border: 1px solid ${(props) => props.theme.color.black8};
  border-radius: 5px;
`;

const RightCodeBox = styled(CodeBox)`
  border: 1px solid ${(props) => props.theme.color.black8};
  border-radius: 5px;
`;

const HyphenBox = styled.div`
  ${flex()};
`;

const Line = styled.div`
  width: 0.7rem;
  height: 1px;
  background-color: ${(props) => props.theme.color.black6};
`;

const Input = styled.input`
  width: 4.8rem;
  height: 5.75rem;
  text-transform: uppercase;
  font-size: 3.5rem;
  border-radius: 5px;
  border: 0;
  text-align: center;
  &:focus {
    ${focusedInputBoxShadow}
  }
`;

const InvaildBox = styled.div`
  width: 27rem;
  height: 3rem;
  margin: 3rem auto 0 auto;
  border: 1px solid ${(props) => props.theme.color.warningRed};
  border-radius: 5px;
  background-color: rgba(224, 30, 90, 0.1);
  ${flex()};
`;

const WarningText = styled.span`
  padding-left: 0.4rem;
  padding-bottom: 0.05rem;
  font-size: 0.9rem;
  color: ${(props) => props.theme.color.black3};
`;

const InfoText = styled.div`
  margin-top: 3rem;
  color: ${(props) => props.theme.color.black3};
`;

const CodeVerifyBox = () => {
  const {
    verify: { verifyCode },
    email,
  } = useSignupState();
  const dispatch = useDispatch();

  const refs = Array(6)
    .fill(1)
    .map(() => useRef<HTMLInputElement>(null));

  const [codes, setCodes] = useState(Array(6).fill(''));
  const [valid, setValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [, s] = name.split('-');
    const suffix = Number(s);

    if (isInt(value, { min: 0, max: 9 }) || isAlpha(value) || value === '') {
      setCodes(
        [...codes].map((code: string, idx: number) => {
          return (idx === suffix ? value : code).toUpperCase();
        }),
      );
      setValid(true);

      if (value.length === 1) {
        if (suffix < 5) {
          refs[suffix + 1].current?.focus();
        }
      }
    }
  };

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const [, s] = name.split('-');
    const suffix = Number(s);

    if (e.key === 'Backspace' && value.length === 0) {
      if (suffix > 0) {
        refs[suffix - 1].current?.focus();
      }
    }
  };

  useEffect(() => {
    return () => {
      dispatch(removeVerifyCode());
    };
  }, []);

  useEffect(() => {
    if (!valid) {
      refs[0].current?.focus();
    }
  }, [valid]);

  if (codes.every((e) => e)) {
    const code = codes.join('');
    try {
      const decryptedCode = decrypt(verifyCode as string);
      if (decryptedCode === code) {
        return <Redirect to={{ pathname: '/signup', state: { email } }} />;
      }
      setCodes(Array(6).fill(''));
      setValid(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container>
      <LogoBox />
      <Title>코드는 이메일에서 확인하세요</Title>
      <SubTitle>
        <BoldText>{email}</BoldText>(으)로 6자 코드를 보냈습니다. 코드는 잠시 후에 만료되니 빨리
        입력하세요.
      </SubTitle>
      <CodeBox>
        <LeftCodeBox>
          {refs.slice(0, 3).map((ref, idx) => (
            <Input
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              type="text"
              name={`code-${idx}`}
              ref={ref}
              value={codes[idx]}
              onChange={handleChange}
              onKeyDown={handleBackspace}
              maxLength={1}
              autoComplete="off"
            />
          ))}
        </LeftCodeBox>
        <HyphenBox>
          <Line />
        </HyphenBox>
        <RightCodeBox>
          {refs.slice(3, 6).map((ref, idx) => (
            <Input
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              type="text"
              name={`code-${idx + 3}`}
              ref={ref}
              value={codes[idx + 3]}
              onChange={handleChange}
              onKeyDown={handleBackspace}
              maxLength={1}
              autoComplete="off"
            />
          ))}
        </RightCodeBox>
      </CodeBox>
      {!valid && (
        <InvaildBox>
          <WarningIcon />
          <WarningText>유효하지 않은 코드입니다. 다시 시도해보세요!</WarningText>
        </InvaildBox>
      )}
      <InfoText>고객님의 코드를 찾을 수 없나요? 스팸 폴더를 확인해 보세요!</InfoText>
    </Container>
  );
};

export default CodeVerifyBox;
