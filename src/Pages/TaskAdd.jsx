import { Select, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { StyledButton, Title } from "../style/globalStyleComponents";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MenuItem } from "@mui/material";
import { mobile } from "../style/responsiveStyles";
import {
  createTask,
  getTaskFromId,
  updateTaskFromId,
} from "../utils/api/taskApi";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { isEmpty } from "../utils/functions";
import { cleanTasks } from "../store/slices/taskSlice";

const PageContainer = styled.div`
  padding: 40px;
  width: calc(100vw - 200px);
  ${mobile(
    "display:flex; flex-direction: column; align-items: center; padding:0; width: 100vw; height: auto;"
  )}
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow: auto;
  background-color: white;
  padding: 10px;
`;

const SettingWrapper = styled.div`
  display: flex;
  gap: 30px;
  ${mobile(`
  flex-direction: column;
  align-items: center;
  `)}
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CategoryWrapper = styled.div`
  min-width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  ${mobile(`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;`)}
`;

const BasicDatePicker = ({ onChange, label, value }) => {
  // const [value, setValue] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        onChange={(value) => {
          // setValue(value);
          return onChange(value);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default function TaskAdd() {
  const params = useParams();
  const history = useHistory();
  const userState = useSelector((state) => state.user);
  const taskState = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    startDate: null,
    endDate: null,
    priority: "",
    condition: "",
  });

  useEffect(() => {
    const onlyClickedUpdate = async () => {
      await getTaskFromId(dispatch, userState, params._id);
      setFormData(taskState.currentTask);
    };

    dispatch(cleanTasks());
    if (!isEmpty(params._id)) {
      onlyClickedUpdate();
    } else {
      setFormData({
        title: "",
        desc: "",
        startDate: null,
        endDate: null,
        priority: "",
        condition: "",
      });
    }
  }, [params._id]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value ?? "" });
  };

  const onChangeSetStartDate = (value, type) => {
    const date = new Date(value);
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    if (type === "start") {
      setFormData({ ...formData, startDate: formattedDate });
    } else {
      setFormData({ ...formData, endDate: formattedDate });
    }
  };

  const onClickSubmit = async () => {
    if (params._id) {
      //UPDATE
      await updateTaskFromId(dispatch, userState, formData, params._id);
      history.push("/home");
    } else {
      //CREATE
      await createTask(dispatch, userState, formData);
      history.goBack();
    }
  };

  return (
    <PageContainer>
      <Title>{isEmpty(params._id) ? "タスク追加" : "タスク修正"}</Title>
      <MainContainer>
        <TextField
          style={{ width: "100%" }}
          onChange={onChange}
          value={formData?.title}
          name="title"
          label="タイトル"
        />
        <TextField
          style={{ width: "100%" }}
          onChange={onChange}
          value={formData?.desc}
          name="desc"
          label="内容"
          multiline
          minRows={15}
        />
        <SettingWrapper>
          <DateWrapper>
            <Title>日付選択</Title>
            <BasicDatePicker
              onChange={(value) => onChangeSetStartDate(value, "start")}
              value={formData?.startDate}
              name="startDate"
              label="開始予定"
            />
            <BasicDatePicker
              onChange={onChangeSetStartDate}
              value={formData?.endDate}
              name="endDate"
              label="終了予定"
            />
          </DateWrapper>
          <CategoryWrapper>
            <Title>優先度</Title>
            <FormControl fullWidth>
              <InputLabel id="priority-simple-select-label">優先度</InputLabel>
              <Select
                id="priority-simple-select-label"
                onChange={onChange}
                value={formData?.priority}
                name="priority"
                label="優先度"
                value={formData?.priority ?? ""}
                labelId="priority-simple-select-label"
                style={{ width: "150px" }}
              >
                <MenuItem value="上">上</MenuItem>
                <MenuItem value="中">中</MenuItem>
                <MenuItem value="下">下</MenuItem>
              </Select>
            </FormControl>
          </CategoryWrapper>
          <CategoryWrapper>
            <Title>状態</Title>
            <FormControl fullWidth>
              <InputLabel id="condition-simple-select-label">状態</InputLabel>
              <Select
                id="condition-simple-select-label"
                onChange={onChange}
                value={formData?.condition}
                name="condition"
                label="優先度"
                value={formData?.condition ?? ""}
                labelId="condition-simple-select-label"
                style={{ width: "150px" }}
              >
                <MenuItem value="未対応">未対応</MenuItem>
                <MenuItem value="処理中">処理中</MenuItem>
                <MenuItem value="検討中">検討中</MenuItem>
                <MenuItem value="完了">完了</MenuItem>
              </Select>
            </FormControl>
          </CategoryWrapper>
        </SettingWrapper>
        <ButtonWrapper>
          <StyledButton color="primary" onClick={onClickSubmit}>
            {isEmpty(params._id) ? "追加" : "修正"}
          </StyledButton>
          <StyledButton color="error">戻る</StyledButton>
        </ButtonWrapper>
      </MainContainer>
    </PageContainer>
  );
}
