import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { addPost } from "../../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoadingPost,
  selectPostErrorMessage,
} from "../../redux/selector";

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
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingPost);
  const errorMessage = useSelector(selectPostErrorMessage);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    dispatch(addPost(title, body)).then((res) => {
      if (res.id) history.push(`/post/${res.id}`);
    });
  };

  return (
    <>
      {!isLoading ? (
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
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default AddPostPage;
