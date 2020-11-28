import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    boxShadow: {
      skyblue: string;
    };

    color: {
      main: string;
      black1: string;
      black2: string;
      black3: string;
      black4: string;
      black5: string;
      black6: string;
      black7: string;
      black8: string;
      black9: string;

      gray1: string;
      gray2: string;
      gray3: string;
      gray4: string;
      gray5: string;
      gray6: string;

      purple1: string;
      purple2: string;
      purple3: string;

      white: string;

      green1: string;
    };

    size: {
      xxxs: string;
      xxs: string;
      xs: string;
      s: string;
      m: string;
      l: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
  }
}
