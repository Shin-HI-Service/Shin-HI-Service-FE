import styled from "@emotion/styled";
import { useLocation } from "react-router";

import {
  Background,
  WhiteContainer,
  TopLogo,
  NavigationBar,
  Container,
} from "@/entities";
import { PAGE_URL } from "@/shared";

export const HomeContainer = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <>
      <Background color="#FCAF16" />
      <TopLogo />
      <WhiteContainer>
        {children}
        {pathname === PAGE_URL.Inferences || pathname === PAGE_URL.Trainings ? (
          <Continue>
            <img src="/img/character2.png"></img>
            <span>안전한 AI 서비스를 위한</span>
            <span>KB HI의 모험은 계속됩니다!</span>
          </Continue>
        ) : null}
      </WhiteContainer>
      <NavigationBar />
    </>
  );
};

const Continue = styled(Container)`
  opacity: 0.6;

  margin-top: 50px;
  > img {
    width: 110px;
    margin-bottom: 10px;
  }
`;
