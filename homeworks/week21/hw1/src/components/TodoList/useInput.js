import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    setValue,
    handleInputChange,
  };
};

export default useInput;
