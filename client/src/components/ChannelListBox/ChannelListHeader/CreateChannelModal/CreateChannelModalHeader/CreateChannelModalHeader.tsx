/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import styled from 'styled-components';

const HeaderContent = styled.div`
  font-size: ${(props) => props.theme.size.xxxl};
  font-weight: 700;
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
