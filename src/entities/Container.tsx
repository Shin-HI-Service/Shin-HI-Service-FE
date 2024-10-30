import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MidContainer = styled(Container)`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const InputContainer = styled(Container)`
  background-color: white;

  margin-top: 30px;

  width: 90%;
  height: 500px;

  border-radius: 5px;

  align-items: flex-start;
`;

export const SmallInputContainer = styled(Container)`
  background-color: white;

  margin-top: 30px;

  width: 90%;
  height: 270px;

  border-radius: 5px;

  align-items: flex-start;
`;

export const WhiteContainer = styled(Container)`
  position: fixed;

  left: 0px;
  top: 8vh;

  background-color: white;

  justify-content: flex-start;

  width: 100%;
  height: 82vh;
`;
