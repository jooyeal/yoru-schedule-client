import { userRequest } from "./requestUrl";
import {
  fetchingSuccess,
  fetchingTasksStart,
  fetchingTaskStart,
  fetchingTasksSuccess,
  fetchingTaskSuccess,
  fetchingError,
} from "../../store/slices/taskSlice";

export const getTaskAll = async (dispatch, user) => {
  const token = user?.currentUser?.accessToken;
  dispatch(fetchingTasksStart());
  try {
    const res = await userRequest(token).get("/tasks");
    dispatch(fetchingTasksSuccess(res.data));
  } catch (err) {
    dispatch(fetchingError());
  }
};

export const getTaskFromId = async (dispatch, user, id) => {
  const token = user?.currentUser?.accessToken;
  dispatch(fetchingTaskStart());
  try {
    const res = await userRequest(token).get(`/tasks/${id}`);
    dispatch(fetchingTaskSuccess(res.data));
  } catch (err) {
    dispatch(fetchingError());
  }
};

export const createTask = async (dispatch, user, data) => {
  const token = user?.currentUser?.accessToken;
  dispatch(fetchingTasksStart());
  try {
    const res = await userRequest(token).post("/tasks/create", {
      ...data,
      userId: user.currentUser?.other?._id,
    });
    dispatch(fetchingSuccess());
  } catch (err) {
    dispatch(fetchingError());
  }
};

export const updateTaskFromId = async (dispatch, user, data, id) => {
  const token = user?.currentUser?.accessToken;
  dispatch(fetchingTasksStart());
  try {
    const res = await userRequest(token).put(`/tasks/update/${id}`, {
      ...data,
    });
    dispatch(fetchingTaskSuccess(res.data));
  } catch (err) {
    dispatch(fetchingError());
  }
};

export const deleteTaskFromId = async (dispatch, user, id) => {
  const token = user?.currentUser?.accessToken;
  dispatch(fetchingTaskStart());
  try {
    const res = await userRequest(token).delete(`/tasks/delete/${id}`);
    dispatch(fetchingTaskSuccess());
  } catch (err) {
    dispatch(fetchingError());
  }
};
