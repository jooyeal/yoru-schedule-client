import React from "react";
import styled from "styled-components";
import { StyledLink } from "../style/globalStyleComponents";
import { mobile } from "../style/responsiveStyles";
import {
  FIRST_PRIORITY,
  IN_PROGRESS,
  NONE_START,
  SECOND_PRIORITY,
  SUCCESS,
  THIRD_PRIORITY,
  UNDER_REVIEW,
} from "../utils/colors";

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 90%;
  height: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: white;
  padding: 3px 10px;
  border-radius: 12px;
  cursor: pointer;
  ${mobile(`width: 90vw;`)}
`;

const StatusWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 30px;
`;

const Title = styled.div``;

const Priority = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: ${({ color }) => color};
  font-weight: bold;
  color: white;
  border-radius: 6px;
`;

const Condition = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: ${({ color }) => color};
  font-weight: bold;
  color: white;
  border-radius: 6px;
`;

export default function ConditionList({ _id, title, priority, condition }) {
  const setColorPriority = (value) => {
    switch (value) {
      case "上":
        return FIRST_PRIORITY;
      case "中":
        return SECOND_PRIORITY;
      case "下":
        return THIRD_PRIORITY;
    }
  };

  const setColorCondition = (value) => {
    switch (value) {
      case "未対応":
        return NONE_START;
      case "処理中":
        return IN_PROGRESS;
      case "検討中":
        return UNDER_REVIEW;
      case "完了":
        return SUCCESS;
    }
  };
  return (
    <StyledLink to={`/task/${_id}`}>
      <ComponentContainer>
        <Title>{title}</Title>
        <StatusWrapper>
          <Priority color={setColorPriority(priority)}>{priority}</Priority>
          <Condition color={setColorCondition(condition)}>
            {condition}
          </Condition>
        </StatusWrapper>
      </ComponentContainer>
    </StyledLink>
  );
}
