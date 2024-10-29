import styled from "@emotion/styled";

const Bottom = styled.img`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0%);

  z-index: -1;

  width: 150px;
`;

const Top = styled.img`
  position: fixed;
  top: 2px;
  left: 50%;
  transform: translate(-50%, 0%);

  z-index: -1;

  width: 130px;
`;

export const BottomLogo = () => (
  <Bottom src="/img/logo.png" alt="logo"></Bottom>
);

export const TopLogo = () => <Top src="/img/logo.png" alt="logo"></Top>;
