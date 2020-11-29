import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import isInt from 'validator/es/lib/isInt';
import isAlpha from 'validator/es/lib/isAlpha';
import { flex, focusedInputBoxShadow } from '@/styles/mixin';
import { useDispatch } from 'react-redux';
import { removeVerifyCode } from '@/store/modules/signup';

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

const CodeVerifyBox = () => {
  const dispatch = useDispatch();

  const refs = Array(6)
    .fill(1)
    .map(() => useRef<HTMLInputElement>(null));

  const [codes, setCodes] = useState(Array(6).fill(''));

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

  if (codes.every((e) => e)) {
    const code = codes.join('');
    // TODO : 인증 코드 전송 구현
    console.log(code);
  }

  useEffect(() => {
    return () => {
      dispatch(removeVerifyCode());
    };
  }, []);

  return (
    <div>
      <h1>인증 코드 입력 화면</h1>
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
    </div>
  );
};

export default CodeVerifyBox;
