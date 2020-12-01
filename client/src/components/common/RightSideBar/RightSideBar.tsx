import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: orange;
`;

interface RightSideBarProps {
  Header: JSX.Element;
  Body: JSX.Element;
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
