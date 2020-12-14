import React from 'react';
import styled from 'styled-components';

const HeaderContent = styled.div`
  font-size: 1.4rem;
  font-weight: 800;
  color: ${(props) => props.theme.color.lightBlack};
  padding: 0.5rem 0;
`;

const AddTopicModalHeader: React.FC = () => {
  return <HeaderContent>Edit channel topic</HeaderContent>;
};

export default AddTopicModalHeader;
