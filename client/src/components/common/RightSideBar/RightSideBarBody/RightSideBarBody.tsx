import React from 'react';
import styled from 'styled-components';
import { SubThreadListBox } from '@/components';
import DetailBox from '@/components/DetailBox/DetailBox';

// const Container = styled.div`
//   background-color: orange;
// `;

interface RightSideBarBodyProps {
  type: string;
}

const RightSideBarBody: React.FC<RightSideBarBodyProps> = ({ type }: RightSideBarBodyProps) => {
  return (
    <>
      {type === 'detail' && <DetailBox />}
      {type === 'thread' && <SubThreadListBox />}
    </>
  );
};

export default RightSideBarBody;
