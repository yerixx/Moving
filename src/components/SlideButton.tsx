import styled from "styled-components";

interface IArrowProps {
  direction: "prev" | "next";
  onClick: () => void;
}

const Button = styled.button<{ $direction: "prev" | "next" }>`
  position: absolute;
  top: 50%;
  ${(props) => (props.$direction === "prev" ? "left: 15px;" : "right: 15px;")}
  transform: translateY(-50%);
  width: 45px;
  height: 20%;
  border-radius: 12px;
  background-color: rgba(20, 20, 20, 0.7);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${(props) => props.theme.white.darker};
  cursor: pointer;
  z-index: 2;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-50%) scale(1.05);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
    fill: white;
    opacity: 0.9;
    transition: opacity 0.2s ease;
  }

  &:hover svg {
    opacity: 1;
  }
`;

const SlideButton = ({ direction, onClick }: IArrowProps) => {
  return (
    <Button $direction={direction} onClick={onClick}>
      {direction === "prev" ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      )}
    </Button>
  );
};

export default SlideButton;
