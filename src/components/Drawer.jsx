import { AddOutlined, HomeOutlined } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { StyledLink } from "../style/globalStyleComponents";
import { mobile } from "../style/responsiveStyles";
import { MAIN_LIGHT, MAIN_WEAK } from "../utils/colors";

const ComponentContainer = styled.div`
  left: 0;
  width: 200px;
  height: auto;
  background-color: ${MAIN_WEAK};
  z-index: 998;
  ${mobile("display: none")};
`;

const List = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  cursor: pointer;
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
  }
  .title {
    margin-left: 20px;
    font-weight: 600;
  }
  &: hover {
    background-color: ${MAIN_LIGHT};
  }
`;

const MenuList = ({ icon, title }) => {
  return (
    <List>
      <div className="icon">{icon}</div>
      <div className="title">{title}</div>
    </List>
  );
};

export default function Drawer() {
  return (
    <ComponentContainer>
      <StyledLink to="/">
        <MenuList icon={<HomeOutlined />} title="ホーム" />
      </StyledLink>
      <StyledLink to="/taskRegist">
        <MenuList icon={<AddOutlined />} title="タスク追加" />
      </StyledLink>
    </ComponentContainer>
  );
}
