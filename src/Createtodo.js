import React, { useState, useContext } from "react";
import { StateContext } from "./context";
import { useResource } from "react-request-hook";
import { v4 as uuidv4 } from "uuid";

export default function Createtodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {  state,dispatch } = useContext(StateContext);
  const {user} =state;   
  


//manoj initial
  function handleTitle(evt) {
    setTitle(evt.target.value);
  }

  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  const [todo , createTodo ] = useResource(({id, title, description, author, dateCreated }) => ({
    url: '/todos',
    method: 'post',
    data: { id,title, description, author, dateCreated }
    }))
  

  function handleCreate() {
    const newTodo = {
      id: uuidv4(),
      title,
      description,
      author: user.username,
      dateCreated: new Date().toLocaleString(),
    
    };
    createTodo(newTodo);

    dispatch({ type: "CREATE_TODO", ...newTodo });

    
    // setTitle("");
    // setDescription("");

  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        AUTHOR:<b>{user.username}</b>
      </div>
      <div>
        <label htmlFor="create-title">TITLE:</label>
        <input
          type="text"
          value={title}
          onChange={handleTitle}
          name="create-title"
          id="create-title"
        />
      </div>

      <div>
        <label htmlFor="create-description">DESCRIPTION:</label>
        <textarea
          value={description}
          onChange={handleDescription}
          name="create-description"
          id="create-description"
        />
      </div>
    
      
      <input type="submit" style={{ backgroundColor: 'blue', color: 'white' }} value="Create" onClick={handleCreate} />

    
    </form>
  );
}
