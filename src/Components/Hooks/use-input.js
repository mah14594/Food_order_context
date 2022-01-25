import { useState } from "react";

const useInput = (CheckValid) => {
  const [enteredvalue, setenteredvalue] = useState("");
  const [istouched, setistouched] = useState(false);

  const valueisvalid = CheckValid(enteredvalue);

  const changeinput = (event) => {
    setistouched(true);
    setenteredvalue(event.target.value);
  };
  const blurhandler = (event) => {
    setistouched(true);
  };
  const reset = () => {
    setenteredvalue("");
    setistouched(false);
  };
  return {
    value: enteredvalue,
    valueisvalid,
    istouched,
    reset,
    changeinput,
    blurhandler,
  };
};
export default useInput;
