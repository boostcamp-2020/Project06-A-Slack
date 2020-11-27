import React from 'react';
import { useChannel } from '@/hooks/useChannel';
import { onChangeShowDetail } from '@/store/modules/channel';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const DetailHeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const DetailHeaderLeft = styled.div``;

const DetailHeaderTitle = styled.div`
  font-size: 20px;
`;

const DetailHeaderContent = styled.div`
  font-size: 12px;
`;

const DetailHeaderButton = styled.button`
  font-size: 25px;
`;

const DetailHeader = () => {
  const { current } = useChannel();
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(onChangeShowDetail());
  };
  return (
    <DetailHeaderBox>
      <DetailHeaderLeft>
        <DetailHeaderTitle>Details</DetailHeaderTitle>
        <DetailHeaderContent>
          {current?.isPublic} {current?.name}
        </DetailHeaderContent>
      </DetailHeaderLeft>
      <DetailHeaderButton onClick={onClick}>닫기</DetailHeaderButton>
    </DetailHeaderBox>
  );
};

export default DetailHeader;
