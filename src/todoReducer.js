function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        username: action.username,
        access_token: action.access_token,
      };
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE_TODO":
      const newTodo = {
        id: action.id,
        title: action.title,
        description: action.description,
        author: action.author,
        dateCreated: Date.now(),
        completed: false,
        dateCompleted: null,
      };
      return [newTodo, ...state];

    case "TOGGLE_TODO":
      return state.map((todoItem) =>
        todoItem.id === action.id
          ? {
              ...todoItem,
              completed: !todoItem.completed,
              dateCompleted: !todoItem.completed
                ? new Date().toLocaleString()
                : null,
            }
          : todoItem
      );

    case "DELETE_TODO":
      const todoToRemove = action.todo;
      const updatedTodos = state.filter((todo) => todo !== todoToRemove);
      return updatedTodos;

    case "FETCH_TODOS":
      return action.todos;

    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todo: todoReducer(state.todo, action),
  };
}
