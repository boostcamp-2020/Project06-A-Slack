import React from 'react';
import styled from 'styled-components';
import slackLogo from '@/public/icon/slack-logo.webp';
import { flex } from '@/styles/mixin';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 5rem;
  ${flex()};
  margin-top: 2rem;
  user-select: none;
`;

const SlackLogo = styled.img`
  width: 14rem;
  margin-right: 3rem;
`;

const LogoBox: React.FC = () => {
  return (
    <Container>
      <Link to="/login">
        <SlackLogo src={slackLogo} />
      </Link>
    </Container>
  );
};

export default LogoBox;
