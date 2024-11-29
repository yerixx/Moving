import styled, { css } from "styled-components";

const hoverStyle = css`
  * {
    transition: color 0.3s;
    &:hover {
      color: ${(props) => props.theme.blue};
    }
  }
`;

const inputStyle = css`
  width: 440px;
  height: 60px;
  padding: 0 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.white.lighter};
  border: none;
  border-radius: 8px;
  @media (max-width: 768px) {
    width: 310px;
    height: 50px;
  }
`;

//common
export const Wrapper = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.black.darker};
  overflow-y: hidden;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  padding-left: 60px;
  @media (max-width: 768px) {
    width: 50%;
    padding-left: 0;
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.white.lighter};
  font-size: 36px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  transition: all 500ms;
  @media (max-width: 768px) {
    width: 80%;
  }
`;
export const Input = styled.input<{ hasError?: boolean }>`
  ${inputStyle}
  margin-top: 20px;
  padding-top: 10px;
  padding: 30px 0 18px 20px;
  background: ${({ theme }) => theme.black.lighter};
  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#f00" : "inherit")};
  }
`;
export const Label = styled.label<{ hasError?: boolean }>`
  position: absolute;
  top: 49%;
  left: 16px;
  color: ${(props) => (props.hasError ? "#f00" : props.theme.white.lighter)};
  user-select: none;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1),
    color 150ms cubic-bezier(0.4, 0, 0.2, 1), top 150ms;
  &.focused {
    top: 0;
    left: 20px;
    transform: scale(0.9) translateY(110%);
    transform-origin: left;
    color: ${(props) => (props.hasError ? "#f00" : props.theme.blue)};
  }
`;

export const Submit = styled.input`
  ${inputStyle}
  margin-top: 40px;
  font-size: 16px;
  font-weight: bold;
  background: ${({ theme }) => theme.blue};
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 768px) {
    width: 80%;
  }
`;

//login
export const Desc = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.gray.lighter};
  padding: 10px 0;
`;
export const FindWapper = styled.div`
  width: 250px;
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  color: ${(props) => props.theme.white.lighter};

  .findauth {
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    ${hoverStyle}
    cursor: pointer;
  }

  .goToSignup {
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.3s;
    p {
      color: ${({ theme }) => theme.gray.lighter};
    }
    .signup {
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        color: ${(props) => props.theme.blue};
      }
    }
  }
`;

//signup
export const Text = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.gray.lighter};
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const VerificationWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
  width: 440px;
  align-items: center;
  @media (max-width: 768px) {
    width: 80%;
    display: flex;
    gap: 20px;
  }
`;
export const PhoneNumberInput = styled.input<{ hasError: boolean }>`
  ${inputStyle}
  width: 100%;
  margin-top: 20px;
  padding-top: 10px;
  padding-left: 20px;
  background: ${({ theme }) => theme.black.lighter};
  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#f00" : "inherit")};
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const PhoneButton = styled.input<{ disabled: boolean }>`
  ${inputStyle}
  width: 100%;
  margin-top: 20px;
  background: ${(props) =>
    props.disabled ? "#222" : props.theme.black.lighter};
  color: ${(props) => (props.disabled ? "#999" : props.theme.white.lighter)};
  transition: all 0.3s;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  &:hover {
    opacity: ${(props) => (props.disabled ? 1 : 0.8)};
  }
  @media (max-width: 768px) {
    width: 40%;
  }
`;
