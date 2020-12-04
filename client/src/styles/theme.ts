import { DefaultTheme } from 'styled-components';

const calcRem = (size: number) => `${size / 16}rem`;

const theme: DefaultTheme = {
  boxShadow: {
    skyblue: '0 0 0 1px rgba(18, 100, 163, 1), 0 0 0 5px rgba(29, 155, 209, 0.3)',
    darkgray: '0 0 4px 10px rgba(0, 0, 0, 0.03), 0 0 4px 10px rgba(0, 0, 0, 0.03)',
  },
  color: {
    main: '#4a154b',
    black1: '#111',
    black2: '#222',
    black3: '#333',
    black4: '#444',
    black5: '#555',
    black6: '#666',
    black7: '#777',
    black8: '#888',
    black9: '#999',

    gray1: '#aaa',
    gray2: '#bbb',
    gray3: '#ccc',
    gray4: '#ddd',
    gray5: '#eee',
    gray6: '#fff',

    lightGray1: '#d0d0d0',
    lightGray2: '#e0e0e0',
    lightGray3: '#f0f0f0',

    purple1: '#350d36',
    purple2: '#3f0e40',
    purple3: '#431e44',

    green1: '#007a5a',
    green2: '#008a6a',
    white: '#fff',

    blue1: '#0073c6',
    blue2: '#1164a3',
    blue3: '#0b4c8c',
    modalWhite: '#f9f9f9',
    semiWhite: '#fafbfc',

    yellow: '#e8912d',
    warningRed: '#D73A49',
    onConnect: '#2bac76',
  },
  size: {
    xxxs: calcRem(8),
    xxs: calcRem(10),
    xs: calcRem(12),
    s: calcRem(14),
    m: calcRem(16),
    l: calcRem(18),
    xl: calcRem(20),
    xxl: calcRem(22),
    xxxl: calcRem(24),
  },
};

export default theme;
