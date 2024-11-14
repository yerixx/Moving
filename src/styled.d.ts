import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    blue: string;
    black: {
      veryDark: string;
      darker: string;
      lighter: string;
    };
    white: {
      darker: string;
      lighter: string;
    };
    gray: {
      lighter: string;
    };
  }
}
