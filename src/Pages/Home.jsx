import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TodoList from "../components/TodoList";
import { Title } from "../style/globalStyleComponents";
import { mobile } from "../style/responsiveStyles";
import { getTaskAll } from "../utils/api/taskApi";
import { useDispatch, useSelector } from "react-redux";
import ConditionList from "../components/ConditionList";
import { conditionSort, isEmpty } from "../utils/functions";

const PageContainer = styled.div`
  display: flex;
  gap: 35px;
  padding: 0 40px;
  width: calc(100vw - 200px);
  height: calc(100vh - 50px);
  overflow-y: auto;
  ${mobile("display:block; padding:0; width: 100vw; height: auto;")}
`;

const TodoListContainer = styled.div`
  flex: 1;
  ${mobile(
    `width: 100vw; display:flex; flex-direction:column; align-items:center;`
  )}
`;

const StatusContainer = styled.div`
  flex: 1;
  ${mobile(
    `width: 100vw; display:flex; flex-direction:column; align-items:center;`
  )}
`;

export default function Home() {
  const userState = useSelector((state) => state.user);
  const tasksState = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    getTaskAll(dispatch, userState);
  }, []);

  return (
    <PageContainer>
      <TodoListContainer>
        <Title>タスクリスト</Title>
        {tasksState.currentTasks?.map((task) => (
          <TodoList
            key={task._id}
            title={task.title}
            description={task.desc}
            _id={task._id}
          />
        ))}
      </TodoListContainer>
      <StatusContainer>
        <Title>状態</Title>
        {conditionSort(tasksState.currentTasks, false)?.map((task) => (
          <ConditionList
            key={task._id}
            title={task.title}
            priority={task.priority}
            condition={task.condition}
            _id={task._id}
          />
        ))}
      </StatusContainer>
    </PageContainer>
  );
}
