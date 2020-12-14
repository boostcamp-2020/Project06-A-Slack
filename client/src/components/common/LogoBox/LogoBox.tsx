import React from 'react';
import styled from 'styled-components';
import slackLogo from '@/public/icon/slack-logo.svg';
import { flex } from '@/styles/mixin';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 5rem;
  ${flex()};
  margin-top: 3rem;
  user-select: none;
`;

const SlackLogo = styled.img`
  width: 12rem;
`;

const LogoBox: React.FC = () => {
  return (
    <Container>
      <Link to="/">
        <SlackLogo src={slackLogo} />
      </Link>
    </Container>
  );
};

export default LogoBox;
