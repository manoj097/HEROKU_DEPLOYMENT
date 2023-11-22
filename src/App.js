import React, { useReducer, useEffect, useState } from "react";
import UserBar from "./UserBar";
import Createtodo from "./Createtodo";
import Todolist from "./Todolist";
import { ThemeContext, StateContext } from "./context";
import appReducer from "./todoReducer";
import Header from "./Header";
import ChangeTheme from "./ChangeTheme";
import { useResource } from "react-request-hook";

function App() {
  // useEffect(() => {
  //   fetch("/api/todos")
  //     .then(result => result.json())
  //     .then(todos => dispatch({ type: 'FETCH_TODOS', todos })); // Dispatch todos, not todo
  // }, []);

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todo: [],
  });

  //   useEffect(getTodos, []);
  //   useEffect(()=>
  // {
  //   if(todoResponse && todoResponse.data ){
  //     dispatch({ type: 'FETCH_TODOS', todos: todoResponse.data.reverse() });
  //   }
  // },[todoResponse]);

  const { user, todos } = state;
  const [theme, setTheme] = useState({
    primaryColor: "orange",
    secondaryColor: "purple",
  });

  const [todoResponse, getTodos] = useResource(() => ({
    url: "/todo",
    method: "get",
    headers: {
      Authorization: `Bearer ${state?.user?.access_token}`,
    },
  }));

  useEffect(() => {
    getTodos();
  }, [state?.user?.access_token]);

  useEffect(() => {
    if (todoResponse && todoResponse.isLoading === false) {
      if (todoResponse.error) {
        console.error("Error fetching todos:", todoResponse.error);

        // Handle the error, e.g., update UI or show an error message
      } else if (todoResponse.data) {
        // Todo fetching was successful
        dispatch({ type: "FETCH_TODOS", todos: todoResponse.data.reverse() });
      }
    }
  }, [todoResponse, dispatch]);

  useEffect(() => {
    if (user) {
      document.title = `${user.username}'s Blog`;
    } else {
      document.title = "Blog";
    }
  }, [user]);

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <ThemeContext.Provider value={theme}>
          <Header text="My Blog" />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <UserBar />
          {user && (
            <>
              <Createtodo />
              <Todolist />
            </>
          )}
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
