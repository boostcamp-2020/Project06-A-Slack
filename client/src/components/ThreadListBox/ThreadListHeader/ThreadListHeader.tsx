import React from 'react';
import { useChannel } from '@/hooks/useChannel';
import styled from 'styled-components';
import { makeUserIcons } from '@/utils/utils';
import { ChannelUsers } from '@/types/channelUsers';
import { openDetail, openTopic } from '@/store/modules/channel';
import { useDispatch } from 'react-redux';

const Container = styled.div`
  max-width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid black;
`;

const Left = styled.div`
  border: 1px solid black;
`;

const LeftTitle = styled.div`
  font-size: 20px;
  border: 1px solid black;
`;

const LeftButton = styled.button`
  background: none;
  border: none;
  outline: none;
  font-size: 12px;
`;

const LeftButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80px;
  border: 1px solid black;
  font-size: 16px;
`;

const Right = styled.div`
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
`;

const RightUserBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
`;

const RightUser = styled.div`
  display: block;
  width: 30px;
  height: 30px;
  border: 1px solid black;
  background: red;
`;

const RightButton = styled.button`
  background: none;
  border: none;
  outline: none;
  font-size: 30px;
`;

const ThreadListHeader = () => {
  const { current, users, topic } = useChannel();
  const dispatch = useDispatch();

  const openDetailBar = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(openDetail());
  };

  const openTopicModal = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(openTopic());
  };

  return current && users ? (
    <Container>
      <Left>
        <LeftTitle>
          {current.isPublic} {current.name}
        </LeftTitle>
        <LeftButtonBox>
          <LeftButton>핀</LeftButton>
          <LeftButton onClick={openTopicModal}>{topic}</LeftButton>
        </LeftButtonBox>
      </Left>
      <Right>
        <RightUserBox>
          {makeUserIcons(users).map((icon: ChannelUsers) => (
            <RightUser key={icon.userId}>{icon.userId}</RightUser>
          ))}
          {users?.length}
        </RightUserBox>
        <RightButton>O</RightButton>
        <RightButton onClick={openDetailBar}>i</RightButton>
      </Right>
    </Container>
  ) : (
    <></>
  );
};

export default ThreadListHeader;
