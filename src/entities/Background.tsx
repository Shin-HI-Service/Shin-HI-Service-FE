import styled from "@emotion/styled";

export const Background = ({
  src,
  color,
  onClick,
  zIndex,
}: {
  src?: string;
  color?: string;
  onClick?: () => void;
  zIndex?: boolean;
}) => {
  const StyledBackground = styled.div`
    ${src ? `background-image: url(${src});` : ""}
    ${color ? `background-color: ${color};` : ""}
    

    position: fixed;
    top: 0px;
    left: 0px;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100vh;

    z-index: -1;
    ${zIndex ? "z-index: 10;" : ""}
  `;

  if (onClick)
    return (
      <StyledBackground
        onClick={() => {
          onClick();
        }}
      />
    );

  return <StyledBackground />;
};
