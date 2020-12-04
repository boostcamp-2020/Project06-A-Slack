import React from 'react';
import styled from 'styled-components';
import { useChannelState } from '@/hooks';

const HeaderContent = styled.div`
  font-size: ${(props) => props.theme.size.l};
`;

const ShowUsersModalHeader: React.FC = () => {
  const { users, current } = useChannelState();

  return (
    <>
      <HeaderContent>
        {users.length} members in {current?.isPublic} {current?.name}
      </HeaderContent>
    </>
  );
};

export default ShowUsersModalHeader;
