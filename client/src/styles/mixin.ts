import styled, { css } from 'styled-components';

export const flex = (alignItems?: string, justifyContent?: string, flexDirection?: string) => css`
  align-items: ${alignItems ?? 'center'};
  justify-content: ${justifyContent ?? 'center'};
  display: flex;
  flex-direction: ${flexDirection ?? 'row'};
`;

export const focusedInputBoxShadow = css`
  box-shadow: 0 0 10px rgba(18, 100, 163, 0.3);
`;

export const modalBoxShadow = css`
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.35);
`;
