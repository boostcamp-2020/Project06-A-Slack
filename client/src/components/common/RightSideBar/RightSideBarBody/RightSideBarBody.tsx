import React from 'react';
import styled from 'styled-components';
import { DetailBody, SubThreadListBox } from '@/components';

// const Container = styled.div`
//   background-color: orange;
// `;

interface RightSideBarBodyProps {
  type: string;
}

const RightSideBarBody: React.FC<RightSideBarBodyProps> = ({ type }: RightSideBarBodyProps) => {
  return (
    <>
      {type === 'detail' && <DetailBody />}
      {type === 'thread' && <SubThreadListBox />}
    </>
  );
};

export default RightSideBarBody;
