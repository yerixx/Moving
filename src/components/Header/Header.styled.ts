import styled from "styled-components";
import { motion } from "framer-motion";

export const Nav = styled(motion.nav)`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  color: ${(props) => props.theme.white.darker};
  font-size: 18px;
  position: fixed;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    height: 60px;
    padding: 0 15px;
  }
`;

export const Col = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

export const Logo = styled(motion.svg)`
  width: 130px;
  height: 35px;
  fill: ${(props) => props.theme.blue};
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100px;
    height: 25px;
  }
`;

export const Items = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  transition: opacity 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }

  a {
    font-size: 18px;

    @media (max-width: 768px) {
      font-size: 15px;
      &:hover {
        opacity: 1;
      }
    }
  }
`;
export const LoginLogout = styled.div`
  button {
    background: inherit;
    border: none;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    @media (max-width: 768px) {
      font-size: 15px;
      padding-bottom: 6px;
    }
  }
`;
export const Search = styled.form`
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    fill: ${(props) => props.theme.white.darker};
    @media (max-width: 768px) {
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: 768px) {
    position: static;
  }
`;

export const Input = styled(motion.input)`
  width: 217px;
  position: absolute;
  left: -180px;
  transform-origin: right center;
  background: transparent;
  color: ${(props) => props.theme.white.darker};
  font-size: 18px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.white.darker};
  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    left: 0;
    top: 60px;
    transform-origin: top center;
    background-color: ${(props) => props.theme.black.darker};
    padding: 10px 20px;
    border: 1px solid ${(props) => props.theme.white.darker};
    font-size: 15px;
    border-radius: 4px;
  }

  &::placeholder {
    font-size: 15px;

    @media (max-width: 768px) {
      font-size: 13px;
    }
  }
`;
