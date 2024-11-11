import { useNavigate } from "react-router-dom";
import {
  Form,
  Title,
  Text,
  InputWrapper,
  Input,
  Desc,
  Submit,
  VerificationWrapper,
} from "../styles/loginSignup.styled";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <Form>
      <Title>MOVING 회원가입</Title>
      <Text>아이디와 이메일로 간편하게 무빙을 시작하세요</Text>
      <InputWrapper>
        <Input type="text" placeholder="아이디" />
        <Desc>영문 소문자 또는 영문 소문자, 숫자 조합 6~12자리</Desc>

        <Input type="password" placeholder="비밀번호" />
        <Input type="password" placeholder="비밀번호 확인" />
        <Desc>영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15 자리</Desc>

        <Input type="email" placeholder="이메일" />

        <VerificationWrapper>
          <Input type="text" placeholder="휴대폰 번호" />
          <Input type="submit" value={"인증번호 전송"} />
        </VerificationWrapper>
      </InputWrapper>
      <Submit type="submit" value={"회원가입하기"} />
    </Form>
  );
};

export default Signup;
