import React from "react";
import classes from "./Input.module.css";
export default React.forwardRef(function Input(props, ref) {
  return (
    <div className={classes.input}>
      <label>{props.label}</label>
      <input
        ref={ref}
        type={props.type}
        id={props.id}
        min={props.min}
        max={props.max}
        value={props.value}
        step={props.step}
        defaultValue={props.default}
      />
    </div>
  );
});
