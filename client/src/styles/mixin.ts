import styled, { css } from 'styled-components';

export const flex = (alignItems?: string, justifyContent?: string) => css`
  align-items: ${alignItems ?? 'center'};
  justify-content: ${justifyContent ?? 'center'};
  display: flex;
`;
