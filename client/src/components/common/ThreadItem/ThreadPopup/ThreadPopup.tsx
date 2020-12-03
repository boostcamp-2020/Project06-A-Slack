import React, { useState } from 'react';
import styled from 'styled-components';
import { Thread } from '@/types';
import { Link } from 'react-router-dom';
import { DimModal, MenuModal } from '@/components';

const Container = styled.div`
  position: relative;
  background-color: blue;
  button {
    font-size: ${(props) => props.theme.size.xs};
  }
`;

const Modal = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -8rem;
`;

const MoreActionButton = styled.button`
  position: relative;
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

interface ThreadPopupProps {
  thread: Thread;
}

const ThreadPopup: React.FC<ThreadPopupProps> = ({ thread }: ThreadPopupProps) => {
  const [menuModalVisible, setMenuModalVisible] = useState(false);

  const closeMenuModal = () => setMenuModalVisible(false);
  const openMenuModal = () => setMenuModalVisible(true);

  const openEditModal = () => {
    console.log('click');
  };

  return (
    <Container>
      <button type="button">reaction</button>
      <Link to={`/client/1/${thread.channelId}/thread/${thread.id}`}>
        <button type="button">replyInThread</button>
      </Link>
      <button type="button">shareMessage</button>
      <button type="button">Save</button>
      <MoreActionButton type="button" onClick={openMenuModal}>
        MoreActions
        {menuModalVisible && (
          <MenuModal
            top="1rem"
            right="0"
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
      </MoreActionButton>
    </Container>
  );
};

export default ThreadPopup;
