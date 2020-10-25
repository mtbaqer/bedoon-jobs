import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/icons/Logo.svg";
import { ReactComponent as GoogleIcon } from "../assets/icons/GoogleIcon.svg";
import { ReactComponent as FacebookIcon } from "../assets/icons/FacebookIcon.svg";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Link from "../utils/UnstyledLink";

const emailPlaceholder = "عنوان البريد الإلكتروني";
const passwordPlaceholder = "كلمة المرور";

const RequiredMessage = "مطلوب";
const InvalidEmailMessage = "بريد الالكتروني غير صحيح";
const InvalidPasswordMessage = "كلمة المرور يجب ان تكون أطول من ٦ حروف";

const LoginPage: FunctionComponent = () => {
  const initialValues = { email: "", password: "", rememberMe: false };

  const validationSchema = Yup.object({
    email: Yup.string().email(InvalidEmailMessage).required(RequiredMessage),
    password: Yup.string().min(6, InvalidPasswordMessage).required(RequiredMessage),
  });

  const onSubmit = (values: { email: string; password: string }) => {
    console.log(values);
  };

  return (
    <PageContainer>
      <Link to="/">
        <Logo />
      </Link>
      <FormContainer>
        <Title>تسجيل الدخول</Title>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form>
            <FieldsContainer style={{ pointerEvents: "none", opacity: "0.5" }}>
              <FieldContainer>
                <Field as={StyledField} id="email" name="email" placeholder={emailPlaceholder} disabled />
                <ErrorMessage name="email" render={(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>} />
              </FieldContainer>

              <PasswordFieldContainer>
                <ForgotPasswordContainer>
                  <Link to="/">
                    <LinkText>هل نسيت كلمة مرورك؟</LinkText>
                  </Link>
                </ForgotPasswordContainer>
                <Field
                  as={StyledField}
                  id="password"
                  name="password"
                  type="password"
                  placeholder={passwordPlaceholder}
                  disabled
                />
                <ErrorMessage name="password" render={(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>} />
              </PasswordFieldContainer>

              <RememberMeContainer>
                <Label>
                  <Field type="checkbox" id="rememberMe" name="rememberMe" />
                  الاستمرار في تسجيل الدخول من هذا الجهاز.
                </Label>
              </RememberMeContainer>

              <SubmitButton type="submit">تسجيل الدخول</SubmitButton>
            </FieldsContainer>
          </Form>
        </Formik>
        <DividerContainer>
          <Hr />
          <P>أو</P>
          <Hr />
        </DividerContainer>
        <SocialButton>
          <StyledGoogleIcon />
          تسجيل الدخول باستخدام حساب جوجل
        </SocialButton>
        <SocialButton>
          <StyledFacebookIcon />
          تسجيل الدخول باستخدام فيس بوك
        </SocialButton>
      </FormContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #efebf5;
  align-items: center;
  padding: 55px 0 55px 0;
  flex: 1 1 0;
`;

const Title = styled.p`
  font-size: 22px;
  line-height: 42px;
  color: #37333e;
  margin-bottom: 16px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 40px;
  background: #ffffff;
  box-shadow: 0px 34px 74px rgba(39, 52, 107, 0.12);
  border-radius: 20px;
  margin-top: 23px;
  width: 350px;
`;

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const PasswordFieldContainer = styled(FieldContainer)`
  margin-bottom: 14px;
`;

const StyledField = styled.input`
  flex: 1;
  height: 46px;
  border: 2px solid #e3dfe8;
  box-sizing: border-box;
  border-radius: 6px;
  font-size: 14px;
  line-height: 27px;
  color: #37333e;
  padding: 9.5px 16px;
  font-family: inherit;
`;

const StyledErrorMessage = styled.p`
  font-size: 12px;
  line-height: 23px;
  color: #d1365d;
`;

const LinkText = styled.p`
  font-size: 12px;
  line-height: 23px;
  margin-bottom: 6px;
  color: #442675;
  align-self: flex-end;
`;

const ForgotPasswordContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const RememberMeContainer = styled(FieldContainer)`
  margin-bottom: 24px;
`;

const Label = styled.label`
  font-size: 12px;
  line-height: 23px;
  color: #706a79;
`;

const SubmitButton = styled.button`
  background: linear-gradient(138.12deg, #a783e2 -0.01%, #7749c2 94.77%);
  border-radius: 6px;
  font-family: inherit;
  font-size: 12px;
  line-height: 23px;
  font-weight: bold;
  color: #ffffff;
  padding: 14px;
  border: none;
  cursor: pointer;
  flex: 1;
`;

const DividerContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 2px;
  margin-bottom: 24px;
`;

const Hr = styled.div`
  flex: 1;
  max-height: 1px;
  border-top: 1px solid #efebf5;
`;

const P = styled.p`
  font-size: 12px;
  line-height: 23px;
  color: #706a79;
  margin: 4px;
`;

const SocialButton = styled(SubmitButton)`
  font-weight: normal;
  color: #5a4e6f;
  background: #f5f3f8;
  padding: 13px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledGoogleIcon = styled(GoogleIcon)`
  margin-left: 12px;
`;

const StyledFacebookIcon = styled(FacebookIcon)`
  margin-left: 12px;
`;

export default LoginPage;