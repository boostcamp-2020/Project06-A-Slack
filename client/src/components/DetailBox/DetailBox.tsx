import React from 'react';
import { useChannel } from '@/hooks/useChannel';
import styled from 'styled-components';
import DetailHeader from './DeatailHeader/DetailHeader';
import DetailButtonBox from './DetailButtonBox/DetailButtonBox';
import DetailList from './DetailList/DetailList';

interface Props {
  display: boolean;
}
const StyledDetailBox = styled.div<Props>`
  width: 600px;
  display: ${(props: { display: boolean }) => (props.display ? 'block' : 'none')};
`;
const DetailBox = () => {
  const { detailVisible } = useChannel();

  return (
    <StyledDetailBox display={detailVisible}>
      <DetailHeader />
      <DetailButtonBox />
      <DetailList />
    </StyledDetailBox>
  );
};

export default DetailBox;
