import React from 'react';
import { useChannel } from '@/hooks/useChannel';
import styled from 'styled-components';
import DetailHeader from './DeatailHeader/DetailHeader';
import DetailButtonBox from './DetailButtonBox/DetailButtonBox';
import DetailList from './DetailList/DetailList';

const StyledDetailBox = styled.div`
  width: 600px;
  display: ${(props: { visible: boolean }) => (props.visible ? 'block' : 'none')};
`;
const DetailBox = () => {
  const { detailVisible } = useChannel();

  return (
    <StyledDetailBox visible={detailVisible}>
      <DetailHeader />
      <DetailButtonBox />
      <DetailList />
    </StyledDetailBox>
  );
};

export default DetailBox;
