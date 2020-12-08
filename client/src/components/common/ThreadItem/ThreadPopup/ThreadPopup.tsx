import React, { useState } from 'react';
import styled from 'styled-components';
import { Thread } from '@/types';
import { Link } from 'react-router-dom';
import { DimModal, MenuModal, ReactionIcon, CommentIcon, DotIcon } from '@/components';
import { flex, hoverActive } from '@/styles/mixin';
import theme from '@/styles/theme';

const Container = styled.div`
  position: relative;
  ${flex()};
  border-radius: 5px;
  background-color: white;
  border: 1.5px solid ${(props) => props.theme.color.lightGray1};
  button {
    font-size: ${(props) => props.theme.size.xs};
  }
`;

const Modal = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -8rem;
`;

const ModalListItem = styled.div`
  width: 100%;
  padding: 0.4rem 1.2rem;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: ${(props) => props.theme.color.blue1};
  }
`;

const ModalItems = styled.div`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 5px;
  ${hoverActive};
  ${flex()};
`;

const ReactionBox = styled(ModalItems)``;
const CommentBox = styled(ModalItems)``;
const MoreActionBox = styled(ModalItems)`
  position: relative;
`;

interface ThreadPopupProps {
  thread: Thread;
  isParentThreadOfRightSideBar?: boolean;
}

const ThreadPopup: React.FC<ThreadPopupProps> = ({
  thread,
  isParentThreadOfRightSideBar,
}: ThreadPopupProps) => {
  const [menuModalVisible, setMenuModalVisible] = useState(false);

  const closeMenuModal = () => setMenuModalVisible(false);
  const openMenuModal = () => setMenuModalVisible(true);

  const openEditModal = () => {
    console.log('click');
  };

  return (
    <Container>
      <ReactionBox>
        <ReactionIcon size="24px" color={theme.color.black5} />
      </ReactionBox>
      {!thread.parentId && !isParentThreadOfRightSideBar && (
        <Link to={`/client/1/${thread.channelId}/thread/${thread.id}`}>
          <CommentBox>
            <CommentIcon size="19px" color={theme.color.black5} />
          </CommentBox>
        </Link>
      )}
      <MoreActionBox onClick={openMenuModal}>
        <DotIcon color={theme.color.black5} />
        {menuModalVisible && (
          <MenuModal
            top="1rem"
            right="1rem"
            visible={menuModalVisible}
            setVisible={setMenuModalVisible}
          >
            <ModalListItem onClick={openEditModal}>Unfollow message</ModalListItem>
            <ModalListItem>Copy link</ModalListItem>
            <ModalListItem>Pin to this conversation</ModalListItem>
            <ModalListItem>Edit message</ModalListItem>
            <ModalListItem>Delete message</ModalListItem>
          </MenuModal>
        )}
      </MoreActionBox>
    </Container>
  );
};

ThreadPopup.defaultProps = {
  isParentThreadOfRightSideBar: false,
};

export default ThreadPopup;
