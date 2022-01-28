import { Link } from "react-router-dom";
import styled from "styled-components";
import { ERROR, ERROR_WEAK, MAIN, MAIN_WEAK } from "../utils/colors";
import { mobile } from "./responsiveStyles";

const defineColor = (type) => {
  switch (type) {
    case "primary":
      return MAIN;
    case "error":
      return ERROR;
    default:
      return MAIN;
  }
};

const defineHoverColor = (type) => {
  switch (type) {
    case "primary":
      return MAIN_WEAK;
    case "error":
      return ERROR_WEAK;
    default:
      return MAIN_WEAK;
  }
};

export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
  background-color: ${(props) => defineColor(props.color)};
  cursor: pointer;
  border: none;
  border-radius: 10px;
  outline: none;
  width: 100px;
  height: 50px;
  font-size: 18px;
  font-weight: 600;
  font-family: "M PLUS Rounded 1c", sans-serif;
  &:hover {
    background-color: ${(props) => defineHoverColor(props.color)};
  }
  ${mobile(`width:70px; height: 30px; font-size:12px;`)}
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;
