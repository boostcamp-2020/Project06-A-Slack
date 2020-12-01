import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 600px;
  display: ${(props: { visible: boolean }) => (props.visible ? 'block' : 'none')};
`;

const ThreadPopup = () => {
  return (
    <>
      <button type="button">reaction</button>
      <button type="button">replyInThread</button>
      <button type="button">shareMessage</button>
      <button type="button">Save</button>
      <button type="button">MoreActions</button>
    </>
  );
};

export default ThreadPopup;
