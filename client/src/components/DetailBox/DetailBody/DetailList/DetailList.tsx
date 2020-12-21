/* eslint-disable no-shadow */
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useChannelState } from '@/hooks';
import { flex } from '@/styles/mixin';
import { JoinedUser } from '@/types';
import { RightArrowLineIcon } from '@/components';
import theme from '@/styles/theme';
import { USER_DEFAULT_PROFILE_URL } from '@/utils/constants';

const Container = styled.div``;

const ListItem = styled.div`
  ${flex('center', 'space-between')}
  cursor: pointer;
`;

const ListItemName = styled.div`
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

const ListRightBox = styled.div`
  ${flex()}
`;

const MemberInfo = styled.div`
  color: ${(props) => props.theme.color.lightBlack};
  font-size: ${(props) => props.theme.size.m};
  font-weight: bold;
  margin-left: 0.5rem;
`;

const MemberItem = styled.div`
  ${flex('center', 'flex-start')}
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.1s;
  margin: 0.2rem 0;
  &:hover {
    transition: 0.1s;
    color: white;
    background-color: ${(props) => props.theme.color.blue1};
    ${MemberInfo} {
      color: white;
    }
  }
`;

const MemberImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  object-fit: cover;
`;

const MemberCount = styled.span`
  font-size: 0.85rem;
  font-weight: bold;
  color: ${(props) => props.theme.color.black2};
`;

export const DetailList: React.FC = () => {
  const [about, setAbout] = useState(false);
  const [memberBoxVisible, setMemberBoxVisible] = useState(false);
  const { users } = useChannelState();

  const openAbout = () => {
    setAbout((about) => !about);
  };

  const openMembers = () => {
    setMemberBoxVisible((visible) => !visible);
  };

  const handleMemberClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
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
          <ListRightBox>
            <MemberCount>{users.length}</MemberCount>
            <ArrowIcon rotated={memberBoxVisible}>
              <RightArrowLineIcon size="14px" color={theme.color.black5} />
            </ArrowIcon>
          </ListRightBox>
        </ListItem>
        {memberBoxVisible &&
          users?.map((user: JoinedUser) => (
            <MemberItem key={user.userId} onClick={handleMemberClick}>
              <MemberImg
                src={user.image}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.src = USER_DEFAULT_PROFILE_URL;
                }}
              />
              <MemberInfo>{user.displayName}</MemberInfo>
            </MemberItem>
          ))}
      </ItemBox>
    </Container>
  );
};
