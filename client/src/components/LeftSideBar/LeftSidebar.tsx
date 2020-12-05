import React, { ReactElement } from 'react';
import styled from 'styled-components';
import LeftSidebarHeader from './LeftSideBarHeader/LeftSideBarHeader';
import LeftSidebarContent from './LeftSideBarContent/LeftSideBarContent';

const Container = styled.div`
  width: 16.25rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.color.purple2};
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
