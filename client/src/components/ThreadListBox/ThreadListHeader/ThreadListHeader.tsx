import React from 'react';

interface Channel {
  channel: {
    id: number;
    name: string;
  };
}

const ThreadListHeader = ({ channel }: Channel) => {
  return <div>{channel.name}</div>;
};

export default ThreadListHeader;
