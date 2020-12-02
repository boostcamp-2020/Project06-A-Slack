import React, { ReactElement } from 'react';
import LeftSidebarHeader from '@/components/LeftSideBar/LeftSideBarHeader/LeftSideBarHeader';
import LeftSidebarContent from '@/components/LeftSideBar/LeftSideBarContent/LeftSideBarContent';
import styled from 'styled-components';

const Container = styled.div`
  background: ${(props) => props.theme.color.purple2};
  height: 100%;
  min-width: 150px;
  width: 200px;
`;

const LeftSideBar = (): ReactElement => {
  return (
    <Container>
      <LeftSidebarHeader />
      <LeftSidebarContent />
    </Container>
  );
};

export default LeftSideBar;
