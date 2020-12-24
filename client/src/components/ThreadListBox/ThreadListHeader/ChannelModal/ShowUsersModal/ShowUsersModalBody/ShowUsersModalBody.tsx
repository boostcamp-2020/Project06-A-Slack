import React from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { useChannelState } from '@/hooks';
import { JoinedUser } from '@/types';
import { CancelButton as CB } from '@/styles/shared';
import { USER_DEFAULT_PROFILE_URL } from '@/utils/constants';
import { LazyImage } from '@/components/common';

const Container = styled.div`
  padding: 0 4px;
  margin: 1rem 0 3rem 0;
`;

const Remove = styled(CB)`
  font-size: 1rem;
  font-weight: bold;
  background: ${(props) => props.theme.color.white};
  border: 1px ${(props) => props.theme.color.gray3} solid;
  border-radius: 3px;
  margin-left: auto;
`;

const SearchedUserContainer = styled.div`
  width: 100%;
  height: 15rem;
  overflow-y: scroll;
  padding: 0 24px;
`;

const SearchedUserBox = styled.div`
  padding: 8px;
  margin: 0.5rem 0;
  border-radius: 5px;
  ${flex('center', 'flex-start')}
  cursor: pointer;
  color: ${(props) => props.theme.color.lightBlack};
  &:hover {
    color: white;
    background-color: ${(props) => props.theme.color.blue1};
  }
`;

const UserName = styled.div`
  font-size: 1rem;
  margin: 0 0.7rem;
  padding-bottom: 0.25rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ShowUsersModalBody: React.FC = () => {
  const { users } = useChannelState();

  return (
    <Container>
      <SearchedUserContainer>
        {users?.map((user: JoinedUser) => (
          <SearchedUserBox key={user.userId}>
            <LazyImage
              width="36"
              height="36"
              src={user.image}
              style={{ objectFit: 'cover', borderRadius: '5px' }}
              errorImage={USER_DEFAULT_PROFILE_URL}
            />
            <UserName>{user.displayName}</UserName>
          </SearchedUserBox>
        ))}
      </SearchedUserContainer>
    </Container>
  );
};

export default ShowUsersModalBody;
