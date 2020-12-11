/* eslint-disable no-shadow */
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useChannelState } from '@/hooks';
import { flex } from '@/styles/mixin';
import { JoinedUser } from '@/types';
import { RightIcon, RightArrowLineIcon } from '@/components';
import theme from '@/styles/theme';

const Container = styled.div``;

const ListItem = styled.div`
  ${flex('center', 'space-between')}
  cursor: pointer;
`;

const ListItemName = styled.div`
  color: ${(props) => props.theme.color.black3};
  font-size: 0.9rem;
  font-weight: bold;
  color: ${(props) => props.theme.color.lightBlack};
`;

interface ArrowProps {
  rotated: boolean;
}

const ArrowIcon = styled.div<ArrowProps>`
  ${flex()}
  width: 2rem;
  height: 2rem;
  margin: 0 0.4rem;
  color: ${(props) => props.theme.color.white};
  font-size: ${(props) => props.theme.size.m};
  background: transparent;
  border: none;
  border-radius: 5px;
  transition: 0.3s;
  ${(props) =>
    props.rotated &&
    css`
      transform: rotate(90deg);
      transition: 0.3s;
    `}
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  outline: 0;
  cursor: pointer;
`;

const ItemBox = styled.div`
  width: 100%;
  padding: 0.8rem 0.9rem;
  border-bottom: 1px solid ${(props) => props.theme.color.lightGray2};
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
  const { users } = useChannelState();

  const openAbout = () => {
    setAbout((about) => !about);
  };

  const openMembers = () => {
    setMembers((members) => !members);
  };

  return (
    <Container>
      <ItemBox>
        <ListItem onClick={openAbout}>
          <ListItemName>About</ListItemName>
          <ArrowIcon rotated={about}>
            <RightArrowLineIcon size="14px" color={theme.color.black5} />
          </ArrowIcon>
        </ListItem>
      </ItemBox>
      <ItemBox onClick={openMembers}>
        <ListItem>
          <ListItemName>Members</ListItemName>
          <ArrowIcon rotated={members}>
            <RightArrowLineIcon size="14px" color={theme.color.black5} />
          </ArrowIcon>
        </ListItem>
        {members &&
          users?.map((user: JoinedUser) => (
            <MemberItem key={user.userId}>
              <MemberImg src={user.image} />
              <MemberInfo>{user.displayName}</MemberInfo>
            </MemberItem>
          ))}
      </ItemBox>
    </Container>
  );
};
