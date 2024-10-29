import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { DotLoader } from "react-spinners";

import {
  BottomLogo,
  Background,
  MidContainer,
  Title,
  SubTitle,
} from "@/entities";

export const FirstLoading = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {show ? (
        <Container>
          <Background color="#FCAF16" />
          <MidContainer>
            <img src="/img/character.png" style={{ marginBottom: "10px" }} />
            <SubTitle>철저한 암호화 기술 기반</SubTitle>
            <SubTitle>안전한 AI 추천 서비스</SubTitle>
            <img src="/img/logo.png" width="140px" />
            <div style={{ height: "50px" }}></div>
            <DotLoader color="white" size={80} speedMultiplier={0.8} />
          </MidContainer>
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
  z-index: 100;
  position: fixed;
  top: 0px;
  left: 0px;

  width: 100%;
  height: 100vh;
`;
