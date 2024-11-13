import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Wrapper,
  Logo,
  Form,
  Title,
  InputWrapper,
  Input,
  Submit,
  FindWapper,
} from "../styles/loginSignup.styled";
import LogoSVG from "../components/LogoSVG";
import { GoToMainProps } from "../Root";

const Login = () => {
  const navigate = useNavigate();
  const { goToMain } = useOutletContext<GoToMainProps>();
  const goToSignup = () => {
    const handleconfirm: boolean = window.confirm(
      "회원가입 페이지로 이동하시겠습니까?"
    );
    if (handleconfirm) {
      navigate("/signup");
    }
  };

  return (
    <Wrapper>
      <Logo onClick={goToMain}>
        <LogoSVG />
      </Logo>
      <Form>
        <Title>MOVING 로그인</Title>
        <InputWrapper>
          <Input type="text" placeholder="아이디" />
          <Input type="password" placeholder="비밀번호" />
        </InputWrapper>
        <Submit type="submit" className="submitBtn" value={"로그인하기"} />
        <FindWapper>
          <div className="findauth">
            <div onClick={() => alert("서비스 준비중 입니다.")}>
              아이디 찾기
            </div>
            <div onClick={() => alert("서비스 준비중 입니다.")}>
              비밀번호 찾기
            </div>
          </div>
          <div className="goToSignup">
            <p>아직 회원이 아니신가요?</p>
            <div className="signup" onClick={goToSignup}>
              회원가입
            </div>
          </div>
        </FindWapper>
      </Form>
    </Wrapper>
  );
};

export default Login;
