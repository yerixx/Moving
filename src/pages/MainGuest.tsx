import { useOutletContext } from "react-router-dom";
import LogoSVG from "../components/Logo/LogoSVG";
import { GoToProps } from "../Root";

import {
  Wrapper,
  Logo,
  Container,
  Title,
  Buttons,
  GoLink,
} from "../styles/mainGuest.styled";

const MainGuest = () => {
  const { goToSignup, goToLogin } = useOutletContext<GoToProps>();
  return (
    <Wrapper>
      <Logo>
        <LogoSVG />
      </Logo>
      <Container>
        <Title>
          {`드라마, 예능, 영화, 스포츠를 한번에!
          지금 시작하세요!!!`}
        </Title>
        <Buttons>
          <GoLink to={"/login"} onClick={goToLogin}>
            로그인
          </GoLink>
          <GoLink to={"/signup"} onClick={goToSignup}>
            회원가입
          </GoLink>
        </Buttons>
      </Container>
    </Wrapper>
  );
};

export default MainGuest;
