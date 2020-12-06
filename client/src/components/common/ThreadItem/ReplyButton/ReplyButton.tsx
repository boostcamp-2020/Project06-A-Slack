import React from 'react';
import styled from 'styled-components';
import { Thread, JoinUser } from '@/types';
import { flex } from '@/styles/mixin';
import { getNotNullDataInArray } from '@/utils/utils';
import { Link } from 'react-router-dom';
import { USER_DEFAULT_PROFILE_URL } from '@/utils/constants';
import { useChannel } from '@/hooks';

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

const getProfile = (users: JoinUser[], subId: number | null) => {
  const idx = users.findIndex((user) => user.userId === subId);
  if (idx !== -1) {
    return users[idx].image;
  }
  return USER_DEFAULT_PROFILE_URL;
};

const ReplyButton: React.FC<ReplyButtonProps> = ({ thread }: ReplyButtonProps) => {
  const { users } = useChannel();

  const getDisplayReplyData = () => {
    const replyData = [
      {
        subThreadUserId: thread.subThreadUserId1,
        subThreadProfile: getProfile(users, thread.subThreadUserId1),
      },
      {
        subThreadUserId: thread.subThreadUserId2,
        subThreadProfile: getProfile(users, thread.subThreadUserId2),
      },
      {
        subThreadUserId: thread.subThreadUserId3,
        subThreadProfile: getProfile(users, thread.subThreadUserId3),
      },
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
