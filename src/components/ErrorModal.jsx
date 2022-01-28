import React from "react";
import styled from "styled-components";
import { clearErrorMessage } from "../store/slices/errorSlice";
import { StyledButton } from "../style/globalStyleComponents";
import { mobile } from "../style/responsiveStyles";

const ComponentContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1001;
`;

const ModalBox = styled.div`
  width: 500px;
  height: 350px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  gap: 20px;
  ${mobile(`
  width:90vw;
  height:50vh;`)}
`;

const ErrorTItle = styled.div``;

export default function ErrorModal({ errorMessage, dispatch }) {
  return (
    <ComponentContainer>
      <ModalBox>
        <ErrorTItle>{errorMessage}</ErrorTItle>
        <StyledButton onClick={() => dispatch(clearErrorMessage())}>
          確認
        </StyledButton>
      </ModalBox>
    </ComponentContainer>
  );
}
