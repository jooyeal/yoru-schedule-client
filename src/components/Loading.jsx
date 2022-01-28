import React from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";

const ComponentContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0.8;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Loading() {
  return (
    <ComponentContainer>
      <ReactLoading type="spin" color="gray" height="10%" width="10%" />
    </ComponentContainer>
  );
}
