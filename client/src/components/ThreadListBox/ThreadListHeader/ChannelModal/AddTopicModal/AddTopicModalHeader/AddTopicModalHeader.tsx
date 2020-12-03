import React from 'react';
import styled from 'styled-components';

const HeaderContent = styled.div`
  font-size: ${(props) => props.theme.size.l};
`;

const AddTopicModalHeader: React.FC = () => {
  return <HeaderContent>Edit channel topic</HeaderContent>;
};

export default AddTopicModalHeader;
