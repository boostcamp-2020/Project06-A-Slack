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

export const hoverActive = css`
  cursor: pointer;
  &:hover,
  &:active {
    background-color: ${(props) => props.theme.color.gray5};
    path {
      fill: ${(props) => props.theme.color.black4};
    }
  }
  &:active {
    background-color: ${(props) => props.theme.color.gray4};
  }
`;

// 주의!! 이 mixin을 쓰면 position에 relative가 들어감!!
export const hoverUnderline = (color: string, bottom?: string) => css`
  position: relative;
  &:hover:after {
    content: '';
    display: block;
    width: 100%;
    height: 0.5px;
    position: absolute;
    bottom: ${bottom ?? '-1.5px'};
    background-color: ${(props) => color ?? props.theme.color.black6};
  }
`;
