import { DefaultTheme } from 'styled-components';

const calcRem = (size: number) => `${size / 16}rem`;

const theme: DefaultTheme = {
  mixin: {
    blueBoxShadow: '0 0 0 1px rgba(18, 100, 163, 1), 0 0 0 5px rgba(29, 155, 209, 0.3)',
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
