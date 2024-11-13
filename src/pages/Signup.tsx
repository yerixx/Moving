import { useNavigate, useOutletContext } from "react-router-dom";
import { GoToMainProps } from "../Root";
import { useForm } from "react-hook-form";
import LogoSVG from "../components/LogoSVG";
import {
  Wrapper,
  Logo,
  Form,
  Title,
  Text,
  InputWrapper,
  InputContainer,
  Input,
  Label,
  Desc,
  Submit,
  VerificationWrapper,
  PhoneNumberInput,
  PhoneButton,
} from "../styles/loginSignup.styled";
import { useState } from "react";

interface FormData {
  id: string;
  password: string;
  passwordChack: string;
  email: string;
  phoneNum: string;
  verificationCode: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const { goToMain } = useOutletContext<GoToMainProps>();

  const [focusStates, setFocusStates] = useState({
    id: false,
    password: false,
    passwordChack: false,
    email: false,
    phoneNum: false,
    verificationCode: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>();

  const handleFocus = (field: keyof FormData) => {
    setFocusStates((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: keyof FormData, value: string) => {
    setFocusStates((prev) => ({ ...prev, [field]: value !== "" }));
    if (field === "id") {
      setUserId(value); // 아이디 입력 값을 userId 상태에 저장
    }
    if (field === "phoneNum") {
      // 휴대폰 번호 유효성 검사
      const phonePattern = /^01[016789]\d{3,4}\d{4}$/;
      setIsPhoneValid(phonePattern.test(value));
    }
  };

  const sendVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setShowVerification(true);
    alert(`인증번호가 발송되었습니다: ${code}`); // 실제로는 서버로 발송
  };

  const onSubmit = (data: FormData) => {
    if (data.verificationCode !== generatedCode) {
      alert("인증번호가 올바르지 않습니다.");
      return;
    }
    alert(`축하합니다 ${userId}님! 회원 가입이 성공적으로 완료되었습니다`);
    navigate("/");
  };

  return (
    <Wrapper>
      <Logo onClick={goToMain}>
        <LogoSVG />
      </Logo>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>MOVING 회원가입</Title>
        <Text>아이디와 이메일로 간편하게 무빙을 시작하세요</Text>
        <InputWrapper>
          {/* 아이디 */}
          <InputContainer>
            <Input
              {...register("id", {
                required: "아이디를 입력해주세요.",
                minLength: {
                  value: 4,
                  message: "아이디는 최소 4자 이상 입력해주세요",
                },
              })}
              id="id"
              type="text"
              onFocus={() => handleFocus("id")}
              onBlur={(e) => handleBlur("id", e.target.value)}
              hasError={!!errors.id}
            />
            <Label
              htmlFor="id"
              className={focusStates.id ? "focused" : ""}
              hasError={!!errors.id}
            >
              {errors.id ? errors.id.message : "아이디"}
            </Label>
          </InputContainer>
          <Desc>영문 소문자 또는 영문 소문자, 숫자 조합 6~12자리</Desc>

          {/* 비밀번호 */}
          <InputContainer>
            <Input
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자 이상 입력해주세요",
                },
                validate: (value) =>
                  value === getValues("passwordChack") ||
                  "비밀번호가 일치하지 않습니다.",
              })}
              id="password"
              type="password"
              onFocus={() => handleFocus("password")}
              onBlur={(e) => handleBlur("password", e.target.value)}
              hasError={!!errors.password}
            />
            <Label
              htmlFor="password"
              className={focusStates.password ? "focused" : ""}
              hasError={!!errors.password}
            >
              {errors.password ? errors.password.message : "비밀번호"}
            </Label>
          </InputContainer>

          {/* 비밀번호 확인 */}
          <InputContainer>
            <Input
              {...register("passwordChack", {
                required: "비밀번호를 확인해주세요.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 최소 8자 이상 입력해주세요",
                },
              })}
              type="password"
              onFocus={() => handleFocus("passwordChack")}
              onBlur={(e) => handleBlur("passwordChack", e.target.value)}
              hasError={!!errors.passwordChack}
            />
            <Label
              htmlFor="passwordChack"
              className={focusStates.passwordChack ? "focused" : ""}
              hasError={!!errors.passwordChack}
            >
              {errors.passwordChack
                ? errors.passwordChack.message
                : "비밀번호 확인"}
            </Label>
          </InputContainer>
          <Desc>영문, 숫자, 특수문자 조합 8~15 자리</Desc>

          {/* 이메일 */}
          <InputContainer>
            <Input
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "이메일 형식을 맞춰주세요.",
                },
              })}
              type="email"
              onFocus={() => handleFocus("email")}
              onBlur={(e) => handleBlur("email", e.target.value)}
              hasError={!!errors.email}
            />
            <Label
              htmlFor="email"
              className={focusStates.email ? "focused" : ""}
              hasError={!!errors.email}
            >
              {errors.email ? errors.email.message : "이메일"}
            </Label>
          </InputContainer>
          {/* 휴대폰 번호 및 인증 */}
          <VerificationWrapper>
            <InputContainer>
              <PhoneNumberInput
                {...register("phoneNum", {
                  required: "휴대폰 번호를 입력해주세요.",
                  pattern: {
                    value: /^01[016789]\d{3,4}\d{4}$/,
                    message: "휴대폰 번호 형식이 올바르지 않습니다.",
                  },
                })}
                id="phoneNum"
                type="text"
                onFocus={() => handleFocus("phoneNum")}
                onBlur={(e) => handleBlur("phoneNum", e.target.value)}
                hasError={!!errors.phoneNum}
              />
              <Label
                htmlFor="phoneNum"
                className={focusStates.phoneNum ? "focused" : ""}
                hasError={!!errors.phoneNum}
              >
                {errors.phoneNum ? errors.phoneNum.message : "휴대폰 번호"}
              </Label>
            </InputContainer>
            <PhoneButton
              id="phoneBtn"
              type="button"
              value="인증번호 전송"
              onClick={sendVerificationCode}
              disabled={!isPhoneValid}
            />
          </VerificationWrapper>

          {/* 인증번호 입력 */}
          {showVerification && (
            <InputContainer>
              <Input
                {...register("verificationCode", {
                  required: "인증번호를 입력해주세요.",
                  minLength: { value: 6, message: "인증번호는 6자리입니다." },
                })}
                id="verificationCode"
                type="text"
                onFocus={() => handleFocus("verificationCode")}
                onBlur={(e) => handleBlur("verificationCode", e.target.value)}
                hasError={!!errors.verificationCode}
              />
              <Label
                htmlFor="verificationCode"
                className={focusStates.verificationCode ? "focused" : ""}
                hasError={!!errors.verificationCode}
              >
                {errors.verificationCode
                  ? errors.verificationCode.message
                  : "인증번호"}
              </Label>
            </InputContainer>
          )}
        </InputWrapper>
        <Submit type="submit" value={"회원가입하기"} />
      </Form>
    </Wrapper>
  );
};

export default Signup;
