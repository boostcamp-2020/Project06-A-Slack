import React, { ReactElement } from 'react';
import styled from 'styled-components';
import LeftSidebarHeader from './LeftSideBarHeader/LeftSideBarHeader';
import LeftSidebarContent from './LeftSideBarContent/LeftSideBarContent';

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
