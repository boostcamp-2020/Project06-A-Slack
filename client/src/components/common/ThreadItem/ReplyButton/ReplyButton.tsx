import React from 'react';
import styled from 'styled-components';
import { Thread, JoinUser } from '@/types';
import { flex } from '@/styles/mixin';
import { getNotNullDataInArray } from '@/utils/utils';
import { Link } from 'react-router-dom';
import { USER_DEFAULT_PROFILE_URL } from '@/utils/constants';
import { useChannelState } from '@/hooks';

const Reply = styled.button`
  ${flex('center', 'flext-start')};
`;

const Profile = styled.img`
  height: ${(props) => props.theme.size.xxxl};
  width: ${(props) => props.theme.size.xxxl};
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
      <Reply id={String(thread.id)}>
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
        {thread.subCount}replies
      </Reply>
    </Link>
  );
};

export default ReplyButton;
