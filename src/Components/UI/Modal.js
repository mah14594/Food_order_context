import React from "react";
import reactDom from "react-dom";
import classes from "./Modal.module.css";

const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const protalplace = document.getElementById("overlays");
export default function Modal(props) {
  return (
    <React.Fragment>
      {reactDom.createPortal(<BackDrop onClose={props.onClose} />, protalplace)}
      {reactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        protalplace
      )}
    </React.Fragment>
  );
}
