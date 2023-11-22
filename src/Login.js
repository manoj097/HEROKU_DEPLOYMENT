import React, { useState, useEffect } from "react";
import { useResource } from "react-request-hook";

export default function Login({ dispatchUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const [user, login, getTodos] = useResource((username, password) => ({
    url: "/auth/login",
    method: "post",
    data: { username, password },
  }));

  useEffect(() => {
    if (user && user.isLoading === false && user.data) {
      setLoginFailed(false);
      dispatchUser({
        type: "LOGIN",
        username: username,
        access_token: user.data.access_token,
      });

      // Fetch todos after successful login
      getTodos();
    }
  }, [user.data, dispatchUser, getTodos, username, user]);

  const handleUsernameChange = (evt) => {
    setUsername(evt.target.value);
    setLoginFailed(false);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
    setLoginFailed(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <>
      {loginFailed && (
        <span style={{ color: "red" }}>INVALID USERNAME OR PASSWORD </span>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="login-username">Username:</label>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          name="login-username"
          id="login-username"
        />
        <label htmlFor="login-password">Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          name="login-password"
          id="login-password"
        />
        <input type="submit" value="Login" disabled={username.length === 0} />
      </form>
    </>
  );
}
