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
`;

//common
export const Form = styled.form`
  /* margin-top: 60px; */
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.black.darker};
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.white.lighter};
  font-size: 40px;
  margin-bottom: 20px;
`;
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  ${inputStyle}
  margin-top: 20px;
  background: ${({ theme }) => theme.black.lighter};
  &::placeholder {
    color: ${({ theme }) => theme.white.lighter};
  }
  &:focus {
    outline: none;
  }
`;

export const Submit = styled.input`
  ${inputStyle}
  margin-top: 40px;
  background: ${({ theme }) => theme.blue};
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

//login
export const Desc = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.gray.lighter};
  padding: 10px 0;
`;
export const FindWapper = styled.div`
  width: 260px;
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  color: ${(props) => props.theme.white.lighter};
  cursor: pointer;

  .findauth {
    display: flex;
    justify-content: space-between;
    ${hoverStyle}
  }

  .goToSignup {
    display: flex;
    justify-content: space-between;
    transition: all 0.3s;
    div:first-child {
      color: ${({ theme }) => theme.gray.lighter};
    }
    ${hoverStyle}
  }
`;

//signup
export const Text = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.gray.lighter};
`;
