import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useChannelState, useUserState } from '@/hooks';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { loadChannelRequest } from '@/store/modules/channel.slice';
import { LockIcon, PoundIcon } from '@/components';
import theme from '@/styles/theme';
import { flex } from '@/styles/mixin';

const Container = styled.div`
  ${flex('center', 'space-between')}
  width: 100%;
  height: 4.3rem;
  flex-shrink: 0;
  background-color: white;
`;

const LeftBox = styled.div``;

const LeftTopBox = styled.div`
  font-weight: 800;
`;
const LeftBottomBox = styled.div`
  width: 16rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ChannelTitle = styled.span`
  color: ${(props) => props.theme.color.black5};
  font-size: 0.8rem;
  font-weight: 200;
  margin-left: 0.2rem;
`;

interface RightSideParams {
  channelId: string;
}

const SubThreadListHeader = () => {
  const dispatch = useDispatch();
  const { current } = useChannelState();
  const { userInfo } = useUserState();
  const { channelId }: RightSideParams = useParams();

  useEffect(() => {
    if (userInfo) {
      dispatch(loadChannelRequest({ channelId: +channelId, userId: userInfo.id }));
    }
  }, [channelId, userInfo]);

  return (
    <Container>
      <LeftBox>
        <LeftTopBox>Thread</LeftTopBox>
        <LeftBottomBox>
          {current?.isPublic ? (
            <PoundIcon size="10px" color={theme.color.black5} />
          ) : (
            <LockIcon size="10px" color={theme.color.black5} />
          )}
          <ChannelTitle>{current?.name}</ChannelTitle>
        </LeftBottomBox>
      </LeftBox>
    </Container>
  );
};

export default SubThreadListHeader;
