import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  *, *:before, *:after {
    box-sizing: border-box;
  }
  
  input, button {
    border: none;
    font-size: 1rem;
  }

`;
