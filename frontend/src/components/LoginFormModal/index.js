import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  let isDisabled = true;
  if (credential.length >= 4 && password.length >= 6) {
    isDisabled = false;
  }

  const demoUser = () => {
    return dispatch(
      sessionActions.login({
        credential: "demouser",
        password: "password123",
      })
    ).then(closeModal);
  };

  return (
    <div className="loging-wrapper">
      <form onSubmit={submitHandler}>
        <h1>Log In</h1>
        <h2>Welcome to Airbnb</h2>
        <label>
          Username or email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <div className="errors">{errors.credential}</div>}
        <div className="login">
          <button type="submit" disabled={isDisabled}>
            Log In
          </button>
        </div>
      </form>
      <div id="or">
        <div className="dividers" />
        <p>or</p>
        <div className="dividers" />
      </div>      <div className="demo-user">
        <button type="submit" onClick={demoUser}>
          Demo User
        </button>
      </div>
    </div>
  );
}

export default LoginFormModal;
