import styled from "styled-components";
import React, { useState } from "react";
import useForm from "./useForm";
import { Input, Options } from "./Input";

const QuestionWrap = styled.div`
  margin: 54px 42px;
`;

const SubmitButton = styled.div`
  input {
    width: 92px;
    height: 40px;
    border-radius: 3px;
    background: #fad312;
    border: none;
    font-family: MicrosoftJhengHei;
    font-size: 15px;
  }

  .warn {
    font-family: MicrosoftJhengHei;
    font-size: 14px;
    padding-top: 21px;
    padding-bottom: 35px;
    color: #e74149;
  }
`;

const Questions = () => {
  const {
    hasError,
    nickname,
    email,
    phone,
    option,
    referal,
    advice,
    handleInputChange,
    handleSubmit,
  } = useForm();

  return (
    <form onSubmit={handleSubmit}>
      <QuestionWrap>
        <Input
          question={"暱稱"}
          required={true}
          name={"nickname"}
          type={"text"}
          placeholder={"您的回答"}
          value={nickname}
          errorMessage={"請輸入暱稱"}
          handleInputChange={handleInputChange}
          hasError={hasError}
        />
        <Input
          question={"電子郵件"}
          required={true}
          name={"email"}
          type={"text"}
          placeholder={"您的電子郵件"}
          value={email}
          errorMessage={"請輸入暱稱"}
          handleInputChange={handleInputChange}
          hasError={hasError}
        />
        <Input
          question={"手機號碼"}
          required={true}
          name={"phone"}
          type={"text"}
          placeholder={"您的手機號碼"}
          value={phone}
          errorMessage={"請輸入手機號碼"}
          handleInputChange={handleInputChange}
          hasError={hasError}
        />
        <Options
          question={"報名類型"}
          required={true}
          name={"option"}
          value={option}
          errorMessage={"請輸入暱稱"}
          handleInputChange={handleInputChange}
          hasError={hasError}
        />
        <Input
          question={"怎麼知道這個活動的？"}
          required={true}
          name={"referal"}
          type={"text"}
          placeholder={"您的回答"}
          value={referal}
          errorMessage={"請輸入資料"}
          handleInputChange={handleInputChange}
          hasError={hasError}
        />
        <Input
          question={
            <>
              其他
              <p>對活動的一些建議</p>
            </>
          }
          required={false}
          name={"advice"}
          type={"text"}
          placeholder={"您的回答"}
          value={advice}
          errorMessage={null}
          handleInputChange={handleInputChange}
          hasError={hasError}
        />
        <SubmitButton>
          <input type="submit" />
          <div className="warn">請勿透過表單送出您的密碼。</div>
        </SubmitButton>
      </QuestionWrap>
    </form>
  );
};

export default Questions;
