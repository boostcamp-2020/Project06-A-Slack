import { css, createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const commonStyle = css`
  html {
    height: 100%;
  }

  body {
    position: relative;
    height: 100%;
  }

  #root {
    position: relative;
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  input,
  button {
    font-size: 1rem;
  }

  a {
    text-decoration: none;
    color: inherit;
    &:link {
      text-decoration: none;
    }
    &:visited {
      text-decoration: none;
    }
    &:hover {
      text-decoration: none;
    }
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${commonStyle}
`;
