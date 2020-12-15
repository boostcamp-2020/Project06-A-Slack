import React from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import theme from '@/styles/theme';
import { useChannelState } from '@/hooks';
import { LockIcon, PoundIcon } from '@/components';

const Container = styled.div`
  ${flex('center', 'flex-start')}
  width: 100%;
  height: 3.2rem;
  flex-shrink: 0;
  font-size: 1.4rem;
  font-weight: 800;
  background-color: white;
  color: ${(props) => props.theme.color.lightBlack};
`;

const Icon = styled.span`
  margin-left: 0.5rem;
`;

const ShowUsersModalHeader: React.FC = () => {
  const { users, current } = useChannelState();

  return (
    <Container>
      {users.length} members in{' '}
      <Icon>
        {current?.isPublic ? (
          <PoundIcon size="15px" color={theme.color.lightBlack} />
        ) : (
          <LockIcon size="15px" color={theme.color.lightBlack} />
        )}{' '}
      </Icon>
      {current?.name}
    </Container>
  );
};

export default ShowUsersModalHeader;
