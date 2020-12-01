import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { flex } from '@/styles/mixin';

export const Button = styled.button`
  ${flex()};
  height: 2.2rem;
  padding: 0 1rem;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

export const SubmitButton = styled(Button)`
  color: white;
  background-color: ${(props) => props.theme.color.green1};
  border: 1px solid ${(props) => lighten(0.03, props.theme.color.green1)};
  &:hover {
    background-color: ${(props) => lighten(0.03, props.theme.color.green1)};
  }
`;

export const CancelButton = styled(Button)`
  color: ${(props) => props.theme.color.black3};
  background-color: ${(props) => props.theme.color.semiWhite};
  border: 1px solid ${(props) => props.theme.color.lightGray1};
  &:hover {
    background-color: ${(props) => darken(0.02, props.theme.color.semiWhite)};
  }
`;
