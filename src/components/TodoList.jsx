import React from "react";
import styled from "styled-components";
import { StyledLink } from "../style/globalStyleComponents";
import { mobile } from "../style/responsiveStyles";

const ComponentContainer = styled.div`
  width: 90%;
  height: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: white;
  padding: 3px;
  border-radius: 12px;
  cursor: pointer;
  ${mobile(`width: 90vw;`)}
`;

const Title = styled.div`
  font-weight: 600;
`;

const Description = styled.div`
  padding: 3px;
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export default function TodoList({ _id, title, description }) {
  return (
    <StyledLink to={`/task/${_id}`}>
      <ComponentContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </ComponentContainer>
    </StyledLink>
  );
}
