import styled from "styled-components";

const QuestionItem = styled.div`
  margin-bottom: 49px;

  .question {
    margin-bottom: 20px;

    span {
      color: #e74149;
    }
  }

  input {
    border: solid 1px #d0d0d0;
    width: 287px;
    height: 23px;
    padding: 0 4px;
  }

  label {
    div:last-child {
      margin-top: 23px;
    }
  }

  input[type="radio"] {
    width: 12px;
    height: 12px;
    border: solid 1px #d0d0d0;
    background-color: #bababa;
  }

  p {
    margin-top: 10px;
    font-family: MicrosoftJhengHei;
    font-size: 14px;
  }

  .error {
    margin-top: 4px;
    color: #e74149;
    position: absolute;
  }
`;

const Input = ({
  question,
  required,
  name,
  type,
  placeholder,
  value,
  hasError,
  errorMessage,
  handleInputChange,
}) => {
  return (
    <QuestionItem>
      <div className="question">
        {question}
        {required && <span> *</span>}
      </div>
      <div>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={handleInputChange}
        />
      </div>
      {hasError && !value && <div className="error">{errorMessage}</div>}
    </QuestionItem>
  );
};

const Radio = ({ name, value, checked, label, handleInputChange }) => {
  return (
    <label>
      <div>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={handleInputChange}
        />
        <span> {label}</span>
      </div>
    </label>
  );
};

const Options = ({
  question,
  required,
  name,
  value,
  hasError,
  errorMessage,
  handleInputChange,
}) => {
  return (
    <QuestionItem>
      <div className="question">
        {question}
        {required && <span> *</span>}
      </div>
      <Radio
        name={name}
        value={"1"}
        checked={value === "1"}
        label={"躺在床上用想像力實作"}
        handleInputChange={handleInputChange}
      />
      <Radio
        name={name}
        value={"2"}
        checked={value === "2"}
        label={"趴在地上滑手機找現成的"}
        handleInputChange={handleInputChange}
      />
      {hasError && !value && <div className="error">{errorMessage}</div>}
    </QuestionItem>
  );
};

export { Input, Options };
