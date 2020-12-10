import React from 'react';
import styled from 'styled-components';
import { useChannelState } from '@/hooks';
import { flex } from '@/styles/mixin';
import { LockIcon, PoundIcon } from '@/components';
import theme from '@/styles/theme';

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

const DetailHeader: React.FC = () => {
  const { current } = useChannelState();

  return (
    <Container>
      <LeftBox>
        <LeftTopBox>Detail</LeftTopBox>
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

export default DetailHeader;
