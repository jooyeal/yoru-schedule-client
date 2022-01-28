import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { StyledButton, StyledLink } from "../style/globalStyleComponents";
import { mobile } from "../style/responsiveStyles";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../utils/api/userApi";
import { useHistory } from "react-router-dom";

const PageContainer = styled.div`
  width: calc(100vw - 200px);
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile(`
  width: 100vw;
  `)}
`;

const LoginForm = styled.div`
  background-color: white;
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  ${mobile(`
    width:90%;
    height:90%;
  `)}
`;

const Title = styled.h2``;

export default function Login() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    login(dispatch, { email, password });
  };

  useEffect(() => {
    if (userState.isFetching) {
      console.log("loading");
    } else {
      console.log("no loading");
    }
    if (userState.currentUser !== null && userState.error == false) {
      history.push("/");
    } else if (userState.error) {
    }
  }, [userState]);

  return (
    <PageContainer>
      <LoginForm>
        <Title>ログインフォーム</Title>
        <TextField label="メール" onChange={(e) => setEmail(e.target.value)} />
        <TextField
          label="パスワード"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledLink to="/regist">会員登録へ進む</StyledLink>
        <StyledButton onClick={onSubmit}>ログイン</StyledButton>
      </LoginForm>
    </PageContainer>
  );
}
