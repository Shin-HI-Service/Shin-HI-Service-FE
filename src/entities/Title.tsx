import styled from "@emotion/styled";

export const LargeTitle = styled.div`
  font-size: 37px;
  font-weight: bold;
`;

export const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

export const SubTitle = styled.div`
  font-size: 19px;
  font-weight: lighter;
`;

export const Explanation = styled.div`
  font-size: 17px;
  color: gray;
  font-weight: lighter;
`;

export const Label = styled.span`
  font-size: 20px;
  font-weight: bold;

  margin-bottom: 2px;

  > span {
    color: #d80000;
    margin-right: 7px;
    margin-left: 15px;
  }
`;

export const ElementTitle = styled(Title)`
  position: relative;
  width: 100%;

  font-size: 20px;

  > svg {
    font-size: 19px;
    font-weight: bold;
    margin-bottom: -2px;
    margin-left: 5px;
  }
`;

export const ElementSubTitle = styled(SubTitle)`
  font-size: 14px;

  font-weight: normal;
`;
