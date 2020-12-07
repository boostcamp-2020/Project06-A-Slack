import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

interface UserStateIconProps {
  width?: string;
  height?: string;
  color?: string;
}

export const CircleIcon = styled.div<UserStateIconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;

const UserStateIcon: React.FC<UserStateIconProps> = ({
  width,
  height,
  color,
}: UserStateIconProps) => {
  return <CircleIcon width={width} height={height} color={color} />;
};

UserStateIcon.defaultProps = {
  width: '0.6rem',
  height: '0.6rem',
  color: theme.color.onConnect,
};
export default UserStateIcon;
