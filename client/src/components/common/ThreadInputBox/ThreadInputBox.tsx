import React, { useState } from 'react';

interface ThreadInputBoxProps {
  inputBoxType: string;
}

const ThreadInputBox: React.FC<ThreadInputBoxProps> = ({ inputBoxType }: ThreadInputBoxProps) => {
  const [inputValue, setInputValue] = useState('');

  const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputValue, inputBoxType);
    // dispatch create thread
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="text" onChange={inputValueHandler} />
      <input type="submit" value=">" />
      <div>{inputValue}</div>
    </form>
  );
};

export default ThreadInputBox;
