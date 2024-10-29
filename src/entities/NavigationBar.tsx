import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router";

import { PAGE_URL } from "@/shared";

export const NavigationBar = () => {
  const { pathname } = useLocation();
  const navigation = useNavigate();

  return (
    <Container>
      {pathname !== PAGE_URL.Inferences ? (
        <Button
          onClick={() => {
            navigation(PAGE_URL.Inferences);
          }}
        >
          <div>AI 서비스</div>사용하기
        </Button>
      ) : (
        <ClickedButton>
          <div>AI 에게</div>추천받기
        </ClickedButton>
      )}
      {pathname === PAGE_URL.Trainings || pathname === PAGE_URL.Inferences ? (
        <div style={{ width: "2px" }}></div>
      ) : (
        <MidLine />
      )}
      {pathname !== PAGE_URL.Trainings ? (
        <Button
          onClick={() => {
            navigation(PAGE_URL.Trainings);
          }}
        >
          <div>AI 개발에</div>기여하기
        </Button>
      ) : (
        <ClickedButton>
          <div>AI 개발에</div>기여하기
        </ClickedButton>
      )}
    </Container>
  );
};

const MidLine = styled.div`
  position: relative;

  top: 25%;
  height: 50%;
  width: 2px;
  background-color: #ffffffa7;

  border-radius: 20;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  position: fixed;

  left: 0px;
  bottom: 0px;

  height: 11vh;
  width: 100vw;
`;

const Button = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 90%;
  width: 45%;

  font-weight: bolder;
  color: white;
  font-size: 25px;
  border-radius: 0 0 10px 10px;

  > div {
    margin-top: 6px;
    margin-bottom: -5px;
    font-weight: normal;
    font-size: 18px;
  }
`;

const ClickedButton = styled(Button)`
  background-color: white;
  color: #776c61;
`;
