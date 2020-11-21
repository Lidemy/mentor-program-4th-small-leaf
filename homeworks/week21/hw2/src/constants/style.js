import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: rgba(0,0,0,0.3);
  }
`;
export default GlobalStyle;
export const MEDIA_QUERY_MD = "@media screen and (min-width: 768px)";
export const MEDIA_QUERY_LG = "@media screen and (min-width: 1000px)";
