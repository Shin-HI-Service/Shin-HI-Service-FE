import { Global, css } from "@emotion/react";

const Styles = css`
  * {
    font-family: "IBM Plex Sans KR", sans-serif;
  }

  body {
    overflow-y: hidden;
  }
`;

const AppStyles = () => <Global styles={Styles}></Global>;

export default AppStyles;
