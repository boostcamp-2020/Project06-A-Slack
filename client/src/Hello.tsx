import React from 'react';
import styled from 'styled-components';

const Chat = styled.div``;
const Button = styled.button``;
const Inputs = styled.input``;
const Who = styled.div``;

const Hello = (args: any) => {
  return (
    <>
      <Who onChange={args.createWho}>
        {args.who.name}님은 {args.who.room}에 입장하였습니다.
      </Who>
      <Inputs value={args.comment} name="comment" onChange={args.onChange} />
      <Button onClick={() => args.onClick(args.commentList, args.comment)}>전송</Button>
      {args.commentList.map((comment: string) => (
        <Chat key={comment}>{comment}</Chat>
      ))}
    </>
  );
};

export default Hello;
