import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { addPost } from "../../WebAPI";

const ErrorMessage = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: red;
`;

const Form = styled.form`
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 62px 72px; ;
`;

const InputWrapper = styled.div`
  width: 800px;
  display: flex;

  & + & {
    margin-top: 23px;
  }
  input {
    width: 700px;
    height: 40px;
    padding: 0 13px;
    box-sizing: border-box;
    font-size: 16px;
    outline: transparent;
  }
`;
const InputLabel = styled.div`
  margin-right: 20px;
  font-size: 22px;
`;

const TextArea = styled.textarea`
  width: 700px;
  height: 200px;
  padding: 8px 13px;
  font-size: 16px;
  box-sizing: border-box;
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

const AddPostPage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setErrorMessage(null);
    addPost(title, body).then((data) => {
      if (data.ok === 0) {
        setIsLoading(false);
        return setErrorMessage(data.message);
      }
      setIsLoading(false);
      history.push("/");
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <InputWrapper>
        <InputLabel>標題</InputLabel>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>內容</InputLabel>
        <TextArea value={body} onChange={(e) => setBody(e.target.value)} />
      </InputWrapper>
      <SubmitButton>發布</SubmitButton>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Form>
  );
};

export default AddPostPage;
