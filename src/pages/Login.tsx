import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Wrapper,
  Logo,
  Form,
  Title,
  InputWrapper,
  InputContainer,
  Input,
  Label,
  Submit,
  FindWapper,
} from "../styles/loginSignup.styled";
import LogoSVG from "../components/Logo/LogoSVG";
import { GoToProps } from "../Root";
import { useState } from "react";
import initialFocusStates from "./util/initialFocusStates";

const Login = () => {
  const navigate = useNavigate();
  const { goToMain, goToSignup } = useOutletContext<GoToProps>();

  const [userId, setUserId] = useState(""); // 아이디 상태 추가
  const [focusStates, setFocusStates] = useState(initialFocusStates);

  const handleFocus = (field: keyof typeof focusStates) => {
    setFocusStates((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: keyof typeof focusStates, value: string) => {
    setFocusStates((prev) => ({ ...prev, [field]: value !== "" }));
    if (field === "id") {
      setUserId(value);
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
          <InputContainer>
            <Input
              type="text"
              id="id"
              onFocus={() => handleFocus("id")}
              onBlur={(e) => handleBlur("id", e.target.value)}
            />
            <Label htmlFor="id" className={focusStates.id ? "focused" : ""}>
              아이디
            </Label>
          </InputContainer>

          <InputContainer>
            <Input
              id="password"
              type="password"
              onFocus={() => handleFocus("password")}
              onBlur={(e) => handleBlur("password", e.target.value)}
            />
            <Label
              htmlFor="password"
              className={focusStates.password ? "focused" : ""}
            >
              비밀번호
            </Label>
          </InputContainer>
        </InputWrapper>
        <Submit
          type="submit"
          className="submitBtn"
          value={"로그인하기"}
          onClick={() => navigate("/home")}
        />
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
