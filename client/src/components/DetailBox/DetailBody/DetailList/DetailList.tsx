/* eslint-disable no-shadow */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useChannelState } from '@/hooks';
import { flex } from '@/styles/mixin';
import { JoinedUser } from '@/types';

const Container = styled.div`
  padding: ${(props) => props.theme.size.m};
`;

const ListItem = styled.div`
  ${flex('center', 'space-between')}
`;

const ListItemName = styled.div`
  color: ${(props) => props.theme.color.black3};
  font-size: ${(props) => props.theme.size.m};
`;

const Arrow = styled.div`
  color: ${(props) => props.theme.color.gray3};
  font-size: ${(props) => props.theme.size.m};
`;

const ItemBox = styled.div`
  margin-top: 20px;
`;

const MemberItem = styled.div`
  ${flex('center', 'space-between')}
`;

const MemberImg = styled.img`
  display: block;
  width: 40px;
  height: 40px;
`;

const MemberInfo = styled.div`
  color: ${(props) => props.theme.color.black2};
  font-size: ${(props) => props.theme.size.m};
`;

export const DetailList: React.FC = () => {
  const [about, setAbout] = useState(false);
  const [members, setMembers] = useState(false);
  const [organization, setOrganization] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [files, setFiles] = useState(false);
  const { users } = useChannelState();

  const openAbout = () => {
    setAbout((about) => !about);
  };

  const openMembers = () => {
    setMembers((members) => !members);
  };

  const openOrganizations = () => {
    setOrganization((organization) => !organization);
  };

  const openPinned = () => {
    setPinned((pinned) => !pinned);
  };

  const openFiles = () => {
    setFiles((files) => !files);
  };

  return (
    <Container>
      <ItemBox>
        <ListItem onClick={openAbout}>
          <ListItemName>About</ListItemName>
          <Arrow>{about ? '∨' : '＞'}</Arrow>
        </ListItem>
      </ItemBox>
      <ItemBox onClick={openMembers}>
        <ListItem>
          <ListItemName>Members</ListItemName>
          <Arrow>{members ? '∨' : '＞'}</Arrow>
        </ListItem>
        {members &&
          users?.map((user: JoinedUser) => (
            <MemberItem key={user.userId}>
              <MemberImg src="https://mblogthumb-phinf.pstatic.net/MjAxOTEyMTJfMjYw/MDAxNTc2MTQwMDE0MjIy.F1V39cfeZPhX87yFFlqkZQqfGmycVOxXbO3vg0dFrvEg.12ulcNAMUNyNzlE7rz5Hk2NVlJfkakVTOspDnzyRkUMg.PNG.vet6390/%EA%B8%B8%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%9E%85%EC%96%91.PNG?type=w800" />
              <MemberInfo>{user.displayName}</MemberInfo>
            </MemberItem>
          ))}
      </ItemBox>
      <ItemBox>
        <ListItem onClick={openOrganizations}>
          <ListItemName>Organizations</ListItemName>
          <Arrow>{organization ? '∨' : '＞'}</Arrow>
        </ListItem>
      </ItemBox>
      <ItemBox>
        <ListItem onClick={openPinned}>
          <ListItemName>Pinned</ListItemName>
          <Arrow>{pinned ? '∨' : '＞'}</Arrow>
        </ListItem>
      </ItemBox>
      <ItemBox>
        <ListItem onClick={openFiles}>
          <ListItemName>Files</ListItemName>
          <Arrow>{files ? '∨' : '＞'}</Arrow>
        </ListItem>
      </ItemBox>
    </Container>
  );
};
