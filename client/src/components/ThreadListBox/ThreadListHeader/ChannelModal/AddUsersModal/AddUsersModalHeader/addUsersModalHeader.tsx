/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactElement, useRef, useState } from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { useChannel, useOnClickOutside } from '@/hooks';
import { joinChannelRequset } from '@/store/modules/channel';

const Header = styled.div`
  ${flex('center', 'flex-start', 'column')};
`;

const HeaderTitle = styled.div`
  font-size: ${(props) => props.theme.size.l};
`;

const ChannelName = styled.div`
  font-size: ${(props) => props.theme.size.s};
`;
const AddUserModalHeader: React.FC = () => {
  const { current } = useChannel();

  return (
    <Header>
      <HeaderTitle>Add People</HeaderTitle>
      <ChannelName>
        {current?.isPublic}
        {current?.name}
      </ChannelName>
    </Header>
  );
};

export default AddUserModalHeader;
