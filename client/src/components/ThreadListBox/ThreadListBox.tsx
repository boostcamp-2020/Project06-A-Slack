import React, { useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loadChannelsRequest } from '@/store/modules/channels';
import styled from 'styled-components';
import ThreadListHeader from './ThreadListHeader/ThreadListHeader';
import ThreadList from './ThreadList/ThreadList';
import ThreadInputBox from './ThreadInputBox/ThreadInputBox';

const StyledThreadListBox = styled.div`
  background-color: pink;
`;

const ThreadListBox = () => {
  // const dispatch = useDispatch();
  // const { channelList, show } = useSelector((state: any) => ({
  //   channelList: state.channels.channelList,
  //   show: state.channels.show,
  // }));

  // const callAPI = useCallback(() => {
  //   dispatch(loadChannelsRequest());
  // }, []);

  return (
    <StyledThreadListBox>
      <div>BoxTop</div>
      <ThreadListHeader />
      <ThreadList />
      <ThreadInputBox />
    </StyledThreadListBox>
  );
};

export default ThreadListBox;