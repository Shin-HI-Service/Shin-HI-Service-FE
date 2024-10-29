import styled from "@emotion/styled";
import {
  Background,
  MidContainer,
  Label,
  Title,
  MidPointLine,
} from "@/entities";

export const InferenceResultModal = ({
  onClose,
  name,
  result,
}: {
  onClose: () => void;
  name: string;
  result?: string;
}) => {
  return (
    <>
      <Background color="#0000008f" onClick={onClose} zIndex />
      <Container>
        <Label>{name}</Label>
        <Title>{result ? "적합도 판단 결과" : "학습 완료!"}</Title>
        <MidPointLine />
        {result ? (
          <>
            <div style={{ height: "20px" }}></div>
            <div style={{ fontSize: "20px" }}>사용자분께 본 상품은</div>
            <Result>
              <span>
                {result[0]}
                {result[1]}
                {result[2]}
                {result[3]}
                {result[4]}
              </span>
              %
            </Result>
            <div style={{ fontSize: "20px" }}>적합 합니다!</div>
          </>
        ) : (
          <>
            <div style={{ height: "20px" }}></div>
            <img src="/img/character2.png" style={{ width: "100px" }} />
            <div style={{ fontSize: "17px", marginTop: "10px" }}>
              개발에 기여해주셔서 감사합니다!
            </div>
          </>
        )}
      </Container>
    </>
  );
};

const Container = styled(MidContainer)`
  width: 80%;
  height: 400px;
  background-color: white;

  border-radius: 10px;

  z-index: 11;
`;

const Result = styled.div`
  font-size: 35px;
  font-weight: bold;
  > span {
    color: #eb9c00;
  }
`;
