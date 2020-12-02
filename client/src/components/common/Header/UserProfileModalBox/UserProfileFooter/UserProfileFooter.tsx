import React from 'react';
import styled from 'styled-components';
import { SubmitButton as SB, CancelButton as CB } from '@/styles/shared';
import { flex } from '@/styles/mixin';

const ModalFooter = styled.div`
  width: 100%;
  height: 100%;
  ${flex('center', 'flex-end')};
`;

const CancelButton = styled(CB)`
  margin: 0 0.5rem;
`;
const SubmitButton = styled(SB)`
  margin: 0 0.5rem;
  font-weight: 800;
`;

interface ProfileFooterProps {
  handleClose: () => void;
}

const UserProfileModalFooter: React.FC<ProfileFooterProps> = ({
  handleClose,
}: ProfileFooterProps) => {
  return (
    <ModalFooter>
      <CancelButton onClick={handleClose}>Cancel</CancelButton>
      <SubmitButton type="submit">Save Changes</SubmitButton>
    </ModalFooter>
  );
};

export default UserProfileModalFooter;
