import React from 'react';
import { useChannel } from '@/hooks/useChannel';
import styled from 'styled-components';
import { makeUserIcons } from '@/utils/utils';
import { ChannelUsers } from '@/types/channelUsers';
import { openDetail } from '@/store/modules/channel';
import { useDispatch } from 'react-redux';

const ThreadListHeaderBox = styled.div`
  max-width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid black;
`;

const ThreadListHeaderLeft = styled.div`
  border: 1px solid black;
`;

const ThreadListHeaderLeftTitle = styled.div`
  font-size: 20px;
  border: 1px solid black;
`;

const ThreadListHeaderLeftButton = styled.button`
  background: none;
  border: none;
  outline: none;
  font-size: 12px;
`;

const ThraedListHeaderLeftButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80px;
  border: 1px solid black;
  font-size: 16px;
`;

const ThreadListHeaderRight = styled.div`
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
`;

const ThreadListHeaderRightUserBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
`;

const ThreadListHeaderRightUser = styled.div`
  display: block;
  width: 30px;
  height: 30px;
  border: 1px solid black;
  background: red;
`;

const ThreadListHeaderRightButton = styled.button`
  background: none;
  border: none;
  outline: none;
  font-size: 30px;
`;

const ThreadListHeader = () => {
  const { current, users } = useChannel();
  const dispatch = useDispatch();

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(openDetail());
  };

  return current && users ? (
    <ThreadListHeaderBox>
      <ThreadListHeaderLeft>
        {current.isPublic} {current.name}
        <ThraedListHeaderLeftButtonBox>
          <ThreadListHeaderLeftButton>핀</ThreadListHeaderLeftButton>
          <ThreadListHeaderLeftButton>Add Topic</ThreadListHeaderLeftButton>
        </ThraedListHeaderLeftButtonBox>
      </ThreadListHeaderLeft>
      <ThreadListHeaderRight>
        <ThreadListHeaderRightUserBox>
          {makeUserIcons(users).map((icon: ChannelUsers) => (
            <ThreadListHeaderRightUser key={icon.userId}>{icon.userId}</ThreadListHeaderRightUser>
          ))}
          {users?.length}
        </ThreadListHeaderRightUserBox>
        <ThreadListHeaderRightButton>O</ThreadListHeaderRightButton>
        <ThreadListHeaderRightButton onClick={onClick}>i</ThreadListHeaderRightButton>
      </ThreadListHeaderRight>
    </ThreadListHeaderBox>
  ) : (
    <></>
  );
};

export default ThreadListHeader;
