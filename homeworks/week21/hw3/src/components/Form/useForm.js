import React, { useState } from "react";

const useForm = () => {
  const [value, setValue] = useState({
    nickname: "",
    email: "",
    phone: "",
    option: "",
    referal: "",
    advice: "",
  });

  const [hasError, setHasError] = useState(false);

  const { nickname, email, phone, option, referal, advice } = value;

  const handleInputChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    if (!nickname || !email || !phone || !option || !referal) {
      return setHasError(true);
    }

    if (!hasError) {
      alert(JSON.stringify(value));
    }
  };

  return {
    value,
    setValue,
    hasError,
    setHasError,
    nickname,
    email,
    phone,
    option,
    referal,
    advice,
    handleInputChange,
    handleSubmit,
  };
};

export default useForm;
