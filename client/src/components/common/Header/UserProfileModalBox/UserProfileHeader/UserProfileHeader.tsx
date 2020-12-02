import React from 'react';
import styled from 'styled-components';

const ModalHeader = styled.div`
  font-size: 1.6rem;
  font-weight: 800;
`;

const UserProfileModalHeader: React.FC = () => {
  return <ModalHeader>Edit your profile</ModalHeader>;
};

export default UserProfileModalHeader;
