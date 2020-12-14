import { loadNotJoinedChannelsRequest } from '@/store/modules/findChannel.slice';
import { sendMessageRequest } from '@/store/modules/socket.slice';
import React, { useEffect, useRef, useState } from 'react';
import { flex } from '@/styles/mixin';
import styled from 'styled-components';
import { useFindChannelState, useUserState } from '@/hooks';
import { useDispatch } from 'react-redux';
import { Channel } from '@/types';
import { CHANNEL_SUBTYPE, SOCKET_MESSAGE_TYPE } from '@/utils/constants';
import { FormInput, SubmitButton as SB } from '@/styles/shared';
import { darken } from 'polished';

const Container = styled.div`
  padding: 0 4px;
  margin: 1rem 0 3rem 0;
`;

const JoinButton = styled(SB)`
  margin-left: auto;
`;

const ChannelListContainer = styled.div`
  width: 100%;
  height: 12rem;
  overflow-y: scroll;
  padding: 0 24px;
`;

const ChannelItemBox = styled.div`
  padding: 8px 5px;
  margin: 0.5rem 0;
  border-radius: 5px;
  ${flex('center', 'flex-start')}
  cursor: pointer;
  color: ${(props) => props.theme.color.lightBlack};
  &:hover {
    background-color: ${(props) => darken(0.02, props.theme.color.threadHover)};
  }
`;

const ChannelName = styled.div`
  font-weight: bold;
  font-size: 1rem;
  color: ${(props) => props.theme.color.lightBlack};
`;

const SearchInput = styled(FormInput)`
  width: calc(100% - 48px);
  height: 50px;
  padding: 0 24px;
  margin: 0 auto;
  margin-bottom: 1rem;
  font-size: ${(props) => props.theme.size.l};
`;

const NoResultBox = styled.div`
  font-weight: bold;
  font-size: 1rem;
  color: ${(props) => props.theme.color.lightBlack};
  padding: 0.5rem;
`;

const debounce = (callback: any) => setTimeout(callback, 200);

interface FindChannelModalProps {
  setFindChannelModalVisible: (fn: (state: boolean) => boolean) => void;
}

const FindChannelModalBody: React.FC<FindChannelModalProps> = ({
  setFindChannelModalVisible,
}: FindChannelModalProps) => {
  const { userInfo } = useUserState();
  const dispatch = useDispatch();
  const { notJoinedChannelList } = useFindChannelState();

  const [filteredChannelList, setFilteredChannelList] = useState<Channel[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState('');
  const [debouceClear, setDebouceClear] = useState<number | null>(null);

  const clickJoinButton = ({ channel }: { channel: Channel }) => {
    if (userInfo) {
      const users = [
        { userId: userInfo.id, displayName: userInfo.displayName, image: userInfo.image },
      ];
      dispatch(
        sendMessageRequest({
          type: SOCKET_MESSAGE_TYPE.CHANNEL,
          subType: CHANNEL_SUBTYPE.FIND_AND_JOIN_CHANNEL,
          channel,
          users,
          room: channel.name,
        }),
      );
      setFindChannelModalVisible((state) => !state);
    }
  };

  const setfilterdList = (value: string) => {
    const filtered = notJoinedChannelList.filter((chan) => chan.name.match(value));
    setFilteredChannelList(filtered);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyword(value);
    if (debouceClear) {
      clearTimeout(debouceClear);
    }
    setDebouceClear(debounce(() => setfilterdList(value)));
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(loadNotJoinedChannelsRequest({ userId: userInfo.id }));
    }
  }, []);

  useEffect(() => {
    return () => {
      if (debouceClear) {
        clearTimeout(debouceClear);
      }
    };
  });

  useEffect(() => {
    setFilteredChannelList(notJoinedChannelList);
  }, [notJoinedChannelList]);

  return (
    <Container>
      <SearchInput
        ref={inputRef}
        onChange={handleKeywordChange}
        value={keyword}
        placeholder="Search by name, email, or user group"
      />
      <ChannelListContainer>
        {filteredChannelList.length ? (
          filteredChannelList.map((channel: Channel) => (
            <ChannelItemBox key={channel.id}>
              <ChannelName>{channel.name}</ChannelName>
              <JoinButton onClick={() => clickJoinButton({ channel })}>Join</JoinButton>
            </ChannelItemBox>
          ))
        ) : (
          <NoResultBox>검색 결과가 없습니다.</NoResultBox>
        )}
      </ChannelListContainer>
    </Container>
  );
};

export default FindChannelModalBody;
