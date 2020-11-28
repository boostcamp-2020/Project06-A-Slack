import { lighten } from 'polished';
import styled from 'styled-components';

export const FormLabel = styled.label`
  margin-top: ${(props) => props.theme.size.xxs};
  font-size: ${(props) => props.theme.size.s};
  font-weight: bold;
`;

export const FormInput = styled.input`
  display: block;
  width: 25rem;
  margin: ${(props) => props.theme.size.xxs} 0;
  padding: ${(props) => props.theme.size.xs} 0;
  padding-left: ${(props) => props.theme.size.xxxs};
  border: 1px solid ${(props) => props.theme.color.black9};
  border-radius: 5px;
  outline: 0;
  &:focus {
    transition: 0.3s;
    box-shadow: ${(props) => props.theme.boxShadow.skyblue};
  }
`;

export const FormButton = styled.button`
  width: 25rem;
  margin: ${(props) => props.theme.size.m} 0;
  padding: ${(props) => props.theme.size.m} 0;
  font-size: ${(props) => props.theme.size.m};
  font-weight: bold;
  color: white;
  border: 0;
  border-radius: 5px;
  background-color: ${(props) => props.theme.color.main};
  cursor: pointer;
  &:hover {
    transition: 0.3s;
    background-color: ${(props) => lighten(0.05, props.theme.color.main)};
  }
`;
