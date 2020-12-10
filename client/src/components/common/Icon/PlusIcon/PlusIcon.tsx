import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Path = styled.path`
  stroke: ${(props) => props.color ?? props.theme.color.channelItemColor};
  fill: ${(props) => props.color ?? props.theme.color.channelItemColor};
`;

const PlusIcon = ({ color, size }: PropsWithChildren<{ color?: string; size?: string }>) => {
  return (
    <svg x="0px" y="0px" width={size ?? '16px'} height={size ?? '16px'} viewBox="0 0 200 200">
      <Path
        color={color}
        strokeWidth="19.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M100,46.334  v107.332 M46.334,100h107.332"
      />
    </svg>
  );
};

export default PlusIcon;
