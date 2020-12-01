import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: orange;
`;

interface RightSideBarProps {
  Header: any;
  Body: any;
}

const RightSideBar: React.FC<RightSideBarProps> = ({ Header, Body }: RightSideBarProps) => {
  return (
    <Container>
      {Header}
      {Body}
    </Container>
  );
};

export default RightSideBar;
