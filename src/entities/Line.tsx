import styled from "@emotion/styled";

export const MidPointLine = styled.div`
  border-top: 1px solid #776c61;
  margin-top: 17px;
  margin-bottom: 20px;
  width: 90%;
  height: 0px;
  color: #776c61;

  ::after {
    content: "⬤";
    position: relative;
    top: -12px;
    left: calc(50% - 5px);
  }
`;
