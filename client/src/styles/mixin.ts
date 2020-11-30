import styled, { css } from 'styled-components';

export const flex = (alignItems?: string, justifyContent?: string) => css`
  align-items: ${alignItems ?? 'center'};
  justify-content: ${justifyContent ?? 'center'};
  display: flex;
`;

export const focusedInputBoxShadow = css`
  box-shadow: 0 0 10px rgba(18, 100, 163, 0.3);
`;
