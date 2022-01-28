import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import TaskDetail from "./Pages/TaskDetail";
import TaskAdd from "./Pages/TaskAdd";
import Login from "./Pages/Login";
import {
  isEmpty,
  setPrototypeIsEmpty,
  setTimeoutSelf,
} from "./utils/functions";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./components/Loading";
import ErrorModal from "./components/ErrorModal";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const userState = useSelector((state) => state.user);
  const taskState = useSelector((state) => state.task);
  const errorState = useSelector((state) => state.error);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (userState.isFetching || taskState.isFetching) {
      setIsLoading(true);
    } else {
      // setTimeoutSelf(() => setIsLoading(false));
      setIsLoading(false);
    }
  }, [state]);

  useEffect(() => {
    setErrorMessage(errorState.errorMessage);
  }, [errorState]);

  return (
    <Router>
      {!isEmpty(errorMessage) && (
        <ErrorModal errorMessage={errorMessage} dispatch={dispatch} />
      )}
      {isLoading && <Loading />}
      <AppBar />
      <div style={{ display: "flex" }}>
        <Drawer />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/task/:_id">
            <TaskDetail />
          </Route>
          <Route exact path="/task/update/:_id">
            <TaskAdd />
          </Route>
          <Route path="/taskRegist">
            <TaskAdd />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
