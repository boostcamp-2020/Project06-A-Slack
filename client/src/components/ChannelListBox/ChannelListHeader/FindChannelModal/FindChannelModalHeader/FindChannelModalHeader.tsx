/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import styled from 'styled-components';

const HeaderContent = styled.div`
  font-size: ${(props) => props.theme.size.xxxl};
  font-weight: 700;
`;

const FindChannelModalHeader: React.FC = () => {
  return <HeaderContent>'Find Not Subscribed Channel'</HeaderContent>;
};

export default FindChannelModalHeader;
