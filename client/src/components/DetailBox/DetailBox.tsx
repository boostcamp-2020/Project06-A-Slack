import React from 'react';
import { useChannel } from '@/hooks/useChannel';
import styled from 'styled-components';
import DetailHeader from './DeatailHeader/DetailHeader';
import DetailButtonBox from './DetailButtonBox/DetailButtonBox';
import DetailList from './DetailList/DetailList';

const Container = styled.div`
  width: 600px;
  display: ${(props: { visible: boolean }) => (props.visible ? 'block' : 'none')};
`;
const DetailBox = () => {
  const { detailVisible } = useChannel();

  return (
    <Container visible={detailVisible}>
      <DetailHeader />
      <DetailButtonBox />
      <DetailList />
    </Container>
  );
};

export default DetailBox;
