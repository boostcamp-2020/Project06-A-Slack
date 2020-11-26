import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  input, button {
    border: none;
    box-sizing: border-box;
    font-size: 1rem;
  }

`;
