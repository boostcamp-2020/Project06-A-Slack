import React from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { useChannelState } from '@/hooks';
import theme from '@/styles/theme';
import { LockIcon, PoundIcon } from '@/components';

const Container = styled.div`
  ${flex('center', 'space-between')}
  width: 100%;
  height: 3rem;
  flex-shrink: 0;
  font-size: 1.2rem;
  font-weight: 800;
  background-color: white;
`;

const LeftBox = styled.div``;

const LeftTopBox = styled.div`
  font-weight: 800;
  color: ${(props) => props.theme.color.lightBlack};
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

interface AddUsersModalHeaderProps {
  isDM: boolean;
}

const AddUserModalHeader: React.FC<AddUsersModalHeaderProps> = ({
  isDM,
}: AddUsersModalHeaderProps) => {
  const { current } = useChannelState();
  return (
    <Container>
      <LeftBox>
        <LeftTopBox>Add people</LeftTopBox>
        {!isDM && (
          <LeftBottomBox>
            {current?.isPublic ? (
              <PoundIcon size="10px" color={theme.color.black5} />
            ) : (
              <LockIcon size="10px" color={theme.color.black5} />
            )}
            <ChannelTitle>{current?.name}</ChannelTitle>
          </LeftBottomBox>
        )}
      </LeftBox>
    </Container>
  );
};

export default AddUserModalHeader;
