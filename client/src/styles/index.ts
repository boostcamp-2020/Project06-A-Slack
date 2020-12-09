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

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #848484;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:hover {
  }
  ::-webkit-scrollbar-thumb:active {
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${commonStyle}
`;
