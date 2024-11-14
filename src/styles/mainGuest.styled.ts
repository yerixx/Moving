import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  background: url("img/MainGuestCover.png") center/cover no-repeat;
`;
export const Logo = styled.section`
  scale: 1.3;
`;
export const Container = styled.section``;
export const Title = styled.h1`
  display: flex;
  flex-direction: column;
  font-size: 60px;
  text-align: center;
  white-space: pre-line;
  color: ${({ theme }) => theme.white.lighter};
`;
export const Buttons = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
`;
export const GoLink = styled(Link)`
  display: inline-block;
  width: 540px;
  height: 80px;
  text-align: center;
  font-size: 22px;
  line-height: 80px;
  border-radius: 10px;
  color: ${({ theme }) => theme.white.lighter};
  background: ${({ theme }) => theme.blue};
  transition: all 0.3s;
  &:first-child {
    background: ${({ theme }) => theme.blue};
    &:hover {
      opacity: 0.8;
    }
  }
  &:last-child {
    background: transparent;
    border: 1px solid ${({ theme }) => theme.white.lighter};
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;
