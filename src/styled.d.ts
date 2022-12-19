import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mainColor: string;
    accentColor: string;
    bgColor: string;
    subColor: string;
  }
}
