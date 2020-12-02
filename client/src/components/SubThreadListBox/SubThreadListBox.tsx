import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSubThread } from '@/hooks';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSubThreadRequest } from '@/store/modules/subThread';
import { isNumberTypeValue } from '@/utils/utils';
import ParentThread from './ParentThread/ParentThread';
import SubThreadList from './SubThreadList/SubThreadList';
import ReplyCountHorizon from './ReplyCountHorizon/ReplyCountHorizon';

const Container = styled.div`
  background-color: green;
`;

interface RightSideParams {
  channelId: string | undefined;
  rightSideType: string | undefined;
  threadId: string | undefined;
}

const SubThreadListBox: React.FC = () => {
  const dispatch = useDispatch();
  const { threadId }: RightSideParams = useParams();
  const { parentThread, subThreadList } = useSubThread();
  const history = useHistory();

  useEffect(() => {
    dispatch(getSubThreadRequest({ parentId: Number(threadId) }));
  }, [threadId]);

  return (
    <>
      {isNumberTypeValue(threadId) && parentThread !== undefined ? (
        <Container>
          <div>subThreadListBox</div>
          <ParentThread parentThread={parentThread} />
          <ReplyCountHorizon subCount={parentThread.subCount} />
          <SubThreadList subThreadList={subThreadList} />
        </Container>
      ) : (
        history.goBack()
      )}
    </>
  );
};

export default SubThreadListBox;
