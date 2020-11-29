import React, { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "../../constants/style";
import Questions from "./Questions";

const FormWrap = styled.div`
  max-width: 645px;
  background: white;
  margin: 0 auto;
  margin-top: 121px;

  .form__top {
    height: 8px;
    background: #fad312;
  }
`;

const FormInfo = styled.div`
  margin: 54px 42px;

  h1 {
    font-family: MicrosoftJhengHei;
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 35px;
  }

  .act {
    height: 13px;
    font-family: MicrosoftJhengHei;
    font-size: 14px;
    color: #000000;
    line-height: 1.5em;
    margin-bottom: 46px;
  }

  .remind {
    font-family: MicrosoftJhengHei;
    font-size: 16px;
    color: #e74149;
  }
`;

const Footer = styled.footer`
  div {
    background: #000000;
    color: #999999;
    text-align: center;
    padding: 26px 12px;
  }
`;

const Form = () => {
  return (
    <>
      <FormWrap>
        <GlobalStyle />
        <div className="form__top" />
        <FormInfo>
          <h1>新拖延運動報名表單</h1>
          <div className="act">
            活動日期：2020/12/10 ~ 2020/12/11
            <br />
            活動地點：台北市大安區新生南路二段1號
          </div>
          <div className="remind">*必填</div>
        </FormInfo>
        <Questions />
      </FormWrap>
      <Footer>
        <div>© 2020 © Copyright. All rights Reserved.</div>
      </Footer>
    </>
  );
};

export default Form;
