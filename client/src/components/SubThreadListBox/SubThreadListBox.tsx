import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSubThreadState } from '@/hooks';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSubThreadRequest } from '@/store/modules/subThread.slice';
import { isNumberTypeValue } from '@/utils/utils';
import { ThreadInputBox } from '@/components/common';
import { INPUT_BOX_TYPE } from '@/utils/constants';
import ParentThread from './ParentThread/ParentThread';
import SubThreadList from './SubThreadList/SubThreadList';
import ReplyCountHorizon from './ReplyCountHorizon/ReplyCountHorizon';

const Container = styled.div`
  width: 25rem;
  display: flex;
  flex-direction: column;
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  /* overflow-y: auto; */
`;

interface RightSideParams {
  channelId: string | undefined;
  rightSideType: string | undefined;
  threadId: string | undefined;
}

const SubThreadListBox: React.FC = () => {
  const dispatch = useDispatch();
  const { threadId }: RightSideParams = useParams();
  const { parentThread, subThreadList } = useSubThreadState();

  useEffect(() => {
    if (!Number.isNaN(Number(threadId))) {
      dispatch(getSubThreadRequest({ parentId: Number(threadId) }));
    }
  }, [threadId]);

  return (
    <>
      {isNumberTypeValue(threadId) && parentThread !== undefined && (
        <Container>
          <ListContainer>
            <ParentThread parentThread={parentThread} />
            {parentThread.subCount > 0 && <ReplyCountHorizon subCount={parentThread.subCount} />}
            <SubThreadList subThreadList={subThreadList} />
            <ThreadInputBox inputBoxType={INPUT_BOX_TYPE.SUBTHREAD} />
          </ListContainer>
        </Container>
      )}
    </>
  );
};

export default SubThreadListBox;
