import { Menu, NotificationsNoneOutlined, Search } from "@mui/icons-material";
import { TextField, InputAdornment } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { StyledLink } from "../style/globalStyleComponents";
import { mobile } from "../style/responsiveStyles";
import { MAIN } from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../utils/functions";
import { logOut } from "../utils/api/userApi";

const ComponentContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: ${MAIN};
  width: 100vw;
  height: 50px;
`;

const Left = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  font-size: 28px;
  ${mobile("flex:5; font-size: 20px;")};
`;

const Center = styled.div`
  flex: 3;
  ${mobile("display: none;")};
`;

const Right = styled.div`
  flex: 4;
  display: flex;
  gap: 5px;
  justify-content: space-around;
  ${mobile(`flex: 5; font-size:18px;`)};
  height: 100%;
`;

const ButtonBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  &:last-child {
    display: none;
  }
  ${mobile(`
  &:nth-child(2){
    display:none;
  }
  &:last-child {
    display:flex;
  }`)}
`;

const Logout = styled.div`
  cursor: pointer;
`;

export default function AppBar() {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    logOut(dispatch);
  };
  return (
    <ComponentContainer>
      <Left>よるのタスク管理</Left>
      <Center>
        <TextField
          style={{ width: "100%" }}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Center>
      <Right>
        <ButtonBlock>
          {isEmpty(userState.currentUser) ? (
            <StyledLink to="/login">ログイン</StyledLink>
          ) : (
            <Logout onClick={onClickLogout}>ログアウト</Logout>
          )}
        </ButtonBlock>
        <ButtonBlock>
          <NotificationsNoneOutlined />
        </ButtonBlock>
        <ButtonBlock>
          <Menu />
        </ButtonBlock>
      </Right>
    </ComponentContainer>
  );
}
