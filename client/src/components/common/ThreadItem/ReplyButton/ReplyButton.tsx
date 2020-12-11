import React from 'react';
import styled from 'styled-components';
import { JoinedUser, Thread } from '@/types';
import { flex } from '@/styles/mixin';
import { getNotNullDataInArray } from '@/utils/utils';
import { Link } from 'react-router-dom';
import { USER_DEFAULT_PROFILE_URL } from '@/utils/constants';
import { useChannelState } from '@/hooks';
import { RightIcon } from '@/components';
import theme from '@/styles/theme';

const ReplyBox = styled.div`
  ${flex('center', 'space-between')};
  width: 30rem;
  padding: 0.2rem 0.4rem;
  border-radius: 5px;
  border: 1px solid transparent;
  .arrow-icon {
    display: none;
  }
  &:hover {
    border: 1px solid ${(props) => props.theme.color.lightGray2};
    background-color: white;
    .arrow-icon {
      display: block;
    }
  }
`;

const LeftBox = styled.div`
  ${flex()};
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

const IconBox = styled.div``;

interface ReplyButtonProps {
  thread: Thread;
}

const getProfile = (users: JoinedUser[], subId: number | null) => {
  const idx = users.findIndex((user) => user.userId === subId);
  if (idx !== -1) {
    return users[idx].image;
  }
  return USER_DEFAULT_PROFILE_URL;
};

const ReplyButton: React.FC<ReplyButtonProps> = ({ thread }: ReplyButtonProps) => {
  const { users } = useChannelState();

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
      <ReplyBox id={String(thread.id)}>
        <LeftBox>
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
        </LeftBox>
        <IconBox className="arrow-icon">
          <RightIcon size="13px" color={theme.color.black8} />
        </IconBox>
      </ReplyBox>
    </Link>
  );
};

export default ReplyButton;
