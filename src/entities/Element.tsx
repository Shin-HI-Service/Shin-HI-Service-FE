import styled from "@emotion/styled";
import { useNavigate } from "react-router";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ElementSubTitle, ElementTitle, Container } from "@/entities";

export const Element = ({
  title,
  subTitle,
  path,
}: {
  title: string;
  subTitle: string;
  path: string;
}) => {
  const navigation = useNavigate();

  return (
    <ElementContainer
      onClick={() => {
        navigation(path);
      }}
    >
      <ElementStyledLine />
      <ElementTitle>
        {title}
        <ArrowForwardIosIcon />
      </ElementTitle>
      <ElementSubTitle>{subTitle}</ElementSubTitle>
    </ElementContainer>
  );
};

const ElementContainer = styled(Container)`
  position: relative;

  width: 90%;
  height: 70px;

  color: white;
  background-color: #fcaf16e8;

  align-items: flex-start;

  border-radius: 5px;

  padding-left: 20px;
  margin-top: 15px;

  box-shadow: 0px 4px 4px 0 rgb(0 0 0 / 45%);
`;

const ElementStyledLine = styled.div`
  position: absolute;

  top: 10%;
  left: 8px;

  height: 80%;
  width: 4px;
  background-color: white;

  border-radius: 2px;
`;
