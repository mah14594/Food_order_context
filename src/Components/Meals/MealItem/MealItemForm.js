import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
export default function MealItemForm(props) {
  const [ValidAmount, setAmountValidity] = useState(true);
  const amountinputRef = useRef();
  const submithandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountinputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountValidity(false);
      return;
    }
    setAmountValidity(true);

    props.onAddtoCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submithandler}>
      <Input
        ref={amountinputRef}
        type="number"
        // min="1"
        // max="5"
        step="1"
        id="amount"
        label="Amount"
        default="1"
      />
      <button type="submit">Add</button>
      {!ValidAmount && <p>Enter a Valid Amount</p>}
    </form>
  );
}
