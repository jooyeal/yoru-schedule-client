import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import {
  StyledButton,
  StyledLink,
  Title as TopTitle,
} from "../style/globalStyleComponents";
import { mobile } from "../style/responsiveStyles";
import { useDispatch, useSelector } from "react-redux";
import { deleteTaskFromId, getTaskFromId } from "../utils/api/taskApi";
import { dateFormatting } from "../utils/functions";

const PageContainer = styled.div`
  padding: 40px;
  width: calc(100vw - 200px);
  height: calc(100vh - 50px);
  ${mobile(
    "display:flex; flex-direction: column; align-items: center; padding:0; width: 100vw; height: auto;"
  )}
`;

const MainContainer = styled.div`
  overflow: auto;
  background-color: white;
  padding: 10px;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile(`flex-direction: column;`)}
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Title = styled.h1`
  ${mobile(`font-size: 20px;`)}
`;

const Description = styled.h2`
  ${mobile(`font-size: 18px;`)}
`;

const StatusWrapper = styled.div`
  padding: 10px;
  margin-top: 20px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  background-color: white;
`;

const Date = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Condition = styled.div`
  flex: 1;
`;

const Priority = styled.div`
  flex: 1;
`;

export default function TaskDetail() {
  const userState = useSelector((state) => state.user);
  const tasksState = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    getTaskFromId(dispatch, userState, params._id);
  }, []);

  const onClickDelete = () => {
    deleteTaskFromId(dispatch, userState, params._id);
  };

  return (
    <PageContainer>
      <TopTitle>タスク詳細</TopTitle>
      <MainContainer>
        <TopWrapper>
          <Title>{tasksState.currentTask?.title}</Title>
        </TopWrapper>
        <Description>{tasksState.currentTask?.desc}</Description>
      </MainContainer>
      <StatusWrapper>
        <Date>
          <h2>日程</h2>
          <label>開始日</label>
          {dateFormatting(tasksState.currentTask?.startDate)}
          <label>終了日</label>
          {dateFormatting(tasksState.currentTask?.endDate)}
        </Date>
        <Priority>
          <h2>優先度</h2>
          {tasksState.currentTask?.priority}
        </Priority>
        <Condition>
          <h2>状態</h2>
          {tasksState.currentTask?.condition}
        </Condition>
      </StatusWrapper>
      <ButtonWrapper>
        <StyledLink to={`/task/update/${params._id}`}>
          <StyledButton color="primary">
            <EditOutlined />
            編集
          </StyledButton>
        </StyledLink>
        <StyledButton color="error" onClick={onClickDelete}>
          <DeleteOutlined />
          削除
        </StyledButton>
      </ButtonWrapper>
    </PageContainer>
  );
}
