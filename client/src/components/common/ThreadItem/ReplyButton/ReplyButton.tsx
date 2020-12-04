import React from 'react';
import styled from 'styled-components';
import { Thread } from '@/types';
import { flex } from '@/styles/mixin';
import { getNotNullDataInArray } from '@/utils/utils';
import { Link } from 'react-router-dom';
import { USER_DEFAULT_PROFILE_URL } from '@/utils/constants';
import { useChannelState } from '@/hooks';

const ReplyBox = styled.div`
  ${flex('center', 'flex-start')};
  margin-top: 0.4rem;
`;

const Profile = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.3rem;
  border-radius: 5px;
  object-fit: cover;
  cursor: pointer;
`;

const ReplyCount = styled.span`
  font-weight: bold;
  font-size: 0.8rem;
  padding-top: 0.2rem;
  margin-left: 0.2rem;
  color: ${(props) => props.theme.color.blue1};
`;

interface ReplyButtonProps {
  thread: Thread;
}

const ReplyButton: React.FC<ReplyButtonProps> = ({ thread }: ReplyButtonProps) => {
  const { users } = useChannelState();

  const getDisplayReplyData = () => {
    // 추후 subThreadUserId 값을 이용해, 채널 멤버의 user 정보를 활용하여 프로필을 뿌려준다.
    const replyData = [
      { subThreadUserId: thread.subThreadUserId1, subThreadProfile: USER_DEFAULT_PROFILE_URL },
      { subThreadUserId: thread.subThreadUserId2, subThreadProfile: USER_DEFAULT_PROFILE_URL },
      { subThreadUserId: thread.subThreadUserId3, subThreadProfile: USER_DEFAULT_PROFILE_URL },
    ];
    const results = getNotNullDataInArray(replyData)('subThreadUserId');
    return results;
  };

  return (
    <Link to={`/client/1/${thread.channelId}/thread/${thread.id}`}>
      <ReplyBox id={String(thread.id)}>
        {getDisplayReplyData().map((el) => {
          const { subThreadUserId, subThreadProfile } = el;
          return (
            <Profile
              src={subThreadProfile === null ? USER_DEFAULT_PROFILE_URL : subThreadProfile}
              key={`${thread.id}${subThreadUserId}`}
              alt="subThreadUserImage"
            />
          );
        })}
        <ReplyCount>{thread.subCount} replies</ReplyCount>
      </ReplyBox>
    </Link>
  );
};

export default ReplyButton;
