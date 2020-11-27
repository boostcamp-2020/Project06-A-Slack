import React from 'react';
import { useChannel } from '@/hooks/useChannel';
import styled from 'styled-components';
import DetailHeader from './DeatailHeader/DetailHeader';

interface Props {
  display: boolean;
}
const StyledDetailBox = styled.div<Props>`
  display: ${(display) => (display ? 'block' : 'none')};
`;
const DetailBox = () => {
  const { showDetail } = useChannel();

  console.log(showDetail);
  return <StyledDetailBox display={showDetail}>{/* <DetailHeader /> */}</StyledDetailBox>;
};

export default DetailBox;
