import styled from "styled-components";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoadingAuth,
  selectAuthErrorMessage,
} from "../../redux/selector";
import { login } from "../../redux/reducers/userReducer";

const ErrorMessage = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: red;
`;

const Form = styled.form`
  margin: 50px auto;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 62px 72px; ;
`;

const InputWrapper = styled.div`
  margin-top: 23px;

  input {
    width: 350px;
    height: 40px;
    padding: 0 20px;
    font-size: 16px;
    border-radius: 20px;
    outline: transparent;
  }
`;
const InputLabel = styled.div`
  font-size: 14px;
  margin-left: 21px;
`;

const SubmitButton = styled.button`
  margin: 53px auto;
  width: 400px;
  height: 56px;
  outline: transparent;
  background-color: gray;
  border-radius: 20px;
  border: 1px solid gray;
  color: white;
  cursor: pointer;
  font-size: 18px;
`;

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingAuth);
  const errorMessage = useSelector(selectAuthErrorMessage);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    dispatch(login(username, password)).then((res) => {
      if (res.data) history.push("/");
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <InputWrapper>
        <InputLabel>USERNAME</InputLabel>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>PASSWORD</InputLabel>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputWrapper>
      <SubmitButton>登入</SubmitButton>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Form>
  );
}

export default LoginPage;
