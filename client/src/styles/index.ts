import { css, createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import notoSansLightWoff from '@/fonts/NotoSansKR-Light.woff';
import notoSansRegularWoff from '@/fonts/NotoSansKR-Regular.woff';
import notoSansMediumWoff from '@/fonts/NotoSansKR-Medium.woff';
import notoSansBoldWoff from '@/fonts/NotoSansKR-Bold.woff';

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

const fontFace = css`
  @font-face {
    font-family: 'noto sans';
    font-style: normal;
    font-weight: 200;
    src: url(${notoSansLightWoff}) format('woff');
    font-display: swap;
  }
  @font-face {
    font-family: 'noto sans';
    font-style: normal;
    font-weight: 400;
    src: url(${notoSansRegularWoff}) format('woff');
    font-display: swap;
  }
  @font-face {
    font-family: 'noto sans';
    font-style: normal;
    font-weight: 700;
    src: url(${notoSansMediumWoff}) format('woff');
    font-display: swap;
  }
  @font-face {
    font-family: 'noto sans';
    font-style: normal;
    font-weight: 800;
    src: url(${notoSansBoldWoff}) format('woff');
    font-display: swap;
  }

  * {
    font-family: 'noto sans', 'Noto Sans KR', '맑은 고딕', 'MalgunGothic', sans-serif;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${normalize};
  ${commonStyle};
  ${fontFace};
`;
