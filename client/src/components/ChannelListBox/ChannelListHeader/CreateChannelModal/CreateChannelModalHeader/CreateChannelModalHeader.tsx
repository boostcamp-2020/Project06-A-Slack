/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import styled from 'styled-components';

const HeaderContent = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${(props) => props.theme.color.lightBlack};
  padding: 14px 0;
`;

interface CreateChannelModalHeaderProps {
  secret: boolean;
}

const CreateChannelModalHeader: React.FC<CreateChannelModalHeaderProps> = ({
  secret,
}: CreateChannelModalHeaderProps) => {
  return <HeaderContent>{secret ? 'Create a private channel' : 'Create a channel'}</HeaderContent>;
};

export default CreateChannelModalHeader;
